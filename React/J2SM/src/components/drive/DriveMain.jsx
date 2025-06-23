// DriveMain.jsx
import React, { useEffect, useRef, useState } from "react";
import "../../styles/drive/drive.scss";
import { DRIVE_API } from "../../api/_http";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function DriveMain() {
  const [files, setFiles] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [uploadDragActive, setUploadDragActive] = useState(false);

  const dropdownRef = useRef();
  const { username } = useAuth();
  const navigate = useNavigate();

  // 처음 로드와 폴더 변경 시 파일 목록 불러오기
  useEffect(() => {
    loadFiles();
  }, [currentFolderId]);

  const loadFiles = async () => {
    try {
      const url = currentFolderId
        ? `${DRIVE_API.LIST}?parentId=${currentFolderId}`
        : DRIVE_API.LIST;
      const res = await fetch(url, { credentials: "include" });
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error("파일 로드 실패", err);
    }
  };

  // 즐겨찾기 / 검색으로 필터링된 리스트
  const filteredFiles = files.filter((f) => {
    const fav = showFavoritesOnly ? f.favorite : true;
    const text = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return fav && text;
  });

  // 드래그 앤 드롭 종료 시 순서 재정렬
  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const sourceIdx = result.source.index;
    const destIdx = result.destination.index;

    // 1) 화면에 보이는 filteredFiles에서 파일
    const draggedFile = filteredFiles[sourceIdx];
    // 2) 전체 files 배열에서 원본 위치
    const realSourceIdx = files.findIndex((f) => f.id === draggedFile.id);

    // 3) 목적지 real index 계산
    let realDestIdx;
    if (destIdx === filteredFiles.length) {
      realDestIdx = files.length;
    } else {
      const destFile = filteredFiles[destIdx];
      realDestIdx = files.findIndex((f) => f.id === destFile.id);
    }

    // 4) 배열 이동
    const newFiles = Array.from(files);
    const [moved] = newFiles.splice(realSourceIdx, 1);
    let insertAt = realDestIdx;
    if (realDestIdx > realSourceIdx) insertAt = realDestIdx - 1;
    newFiles.splice(insertAt, 0, moved);

    setFiles(newFiles);

    // 5) 서버에 순서 저장
    await fetch(DRIVE_API.REORDER, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newFiles.map((f) => f.id)),
    });
  };

  // 파일 업로드 (단일 파일)
  const uploadFile = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("user", username);
    form.append("originalName", file.name);
    if (currentFolderId) form.append("parentId", currentFolderId);
    try {
      const res = await fetch(DRIVE_API.UPLOAD, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      if (!res.ok) throw new Error();
      await loadFiles();
    } catch {
      console.error("파일 업로드 실패");
    }
  };

  // 드래그로 파일 업로드 핸들러
  const handleDrop = (e) => {
    e.preventDefault();
    setUploadDragActive(false);
    Array.from(e.dataTransfer.files).forEach(uploadFile);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setUploadDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setUploadDragActive(false);
  };

  // ZIP 압축 다운로드
  const handleDownloadZip = async (ids) => {
    const q = ids.map((i) => `ids=${i}`).join("&");
    try {
      const res = await fetch(`${DRIVE_API.DOWNLOAD_ZIP}?${q}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "files.zip";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      console.error("압축 다운로드 실패");
    }
  };

  // 폴더 생성
  const createFolder = async () => {
    if (!folderName.trim()) return alert("폴더명을 입력하세요.");
    try {
      const res = await fetch(DRIVE_API.CREATE_FOLDER, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: folderName, parentId: currentFolderId }),
      });
      if (!res.ok) throw new Error();
      setFolderModalOpen(false);
      setFolderName("");
      await loadFiles();
    } catch {
      console.error("폴더 생성 실패");
    }
  };

  // 파일 다운로드
  const handleDownload = (id) => {
    fetch(DRIVE_API.RECENT_VIEW(id), { method: "POST", credentials: "include" })
      .then(() => {
        window.location.href = DRIVE_API.DOWNLOAD(id);
      })
      .catch(() => console.error("다운로드 실패"));
  };

  // 즐겨찾기 토글
  const toggleFavorite = async (id) => {
    await fetch(DRIVE_API.FAVORITE(id), {
      method: "PATCH",
      credentials: "include",
    });
    await loadFiles();
    setActiveMenuId(null);
  };
  // 휴지통 이동
  const moveToTrash = async (id) => {
    await fetch(DRIVE_API.DELETE(id), {
      method: "DELETE",
      credentials: "include",
    });
    await loadFiles();
    setActiveMenuId(null);
  };
  // 공유 드라이브 이동
  const moveToSharedDrive = async (id) => {
    await fetch(DRIVE_API.MOVE_TO_SHARED(id), {
      method: "PATCH",
      credentials: "include",
    });
    await loadFiles();
    setActiveMenuId(null);
  };

  // 이름 변경 클릭
  const handleRenameClick = (file) => {
    setRenamingId(file.id);
    setNewName(file.name);
    setActiveMenuId(null);
  };
  // 이름 변경 확인
  const handleRenameConfirm = async (id) => {
    await fetch(DRIVE_API.RENAME(id), {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    setRenamingId(null);
    await loadFiles();
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <>
      {/* 새 폴더 모달 */}
      {folderModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>새 폴더 만들기</h3>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="폴더명 입력"
            />
            <div className="modal-actions">
              <button onClick={createFolder}>생성</button>
              <button onClick={() => setFolderModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <div
        className={`cloud-main ${uploadDragActive ? "drag-over-area" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* 툴바 */}
        <div className="toolbar">
          <button onClick={() => setFolderModalOpen(true)}>+ 신규 폴더</button>
          <label className="upload-label">
            📤 파일 업로드
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) =>
                e.target.files[0] && uploadFile(e.target.files[0])
              }
            />
          </label>
          <button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
            {showFavoritesOnly ? "⭐ 전체 보기" : "⭐ 즐겨찾기만"}
          </button>
          {currentFolderId && (
            <button onClick={() => setCurrentFolderId(null)}>
              ⬅ 상위 폴더
            </button>
          )}
        </div>

        {/* 검색 바 */}
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Cloud 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* 파일 테이블 */}
        <div className="drivetable">
          <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={({ source }) => setDraggingIndex(source.index)}
          >
            <Droppable droppableId="file-list">
              {(provided) => (
                <table
                  className="drivetables"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <thead>
                    <tr>
                      <th>사용자</th>
                      <th>파일명</th>
                      <th>유형</th>
                      <th>위치</th>
                      <th>업로드 날짜</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file, idx) => (
                      <Draggable
                        key={file.id}
                        draggableId={`${file.id}`}
                        index={idx}
                      >
                        {(prov) => (
                          <tr
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            style={prov.draggableProps.style}
                          >
                            <td>{file.user || username}</td>
                            <td
                              onClick={() =>
                                file.type === "folder" &&
                                setCurrentFolderId(file.id)
                              }
                              style={{
                                cursor:
                                  file.type === "folder"
                                    ? "pointer"
                                    : "default",
                              }}
                            >
                              {renamingId === file.id ? (
                                <>
                                  <input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    onKeyDown={(e) =>
                                      e.key === "Enter" &&
                                      handleRenameConfirm(file.id)
                                    }
                                  />
                                  <button
                                    onClick={() => handleRenameConfirm(file.id)}
                                  >
                                    확인
                                  </button>
                                </>
                              ) : (
                                <>
                                  <span
                                    className={`star-icon ${
                                      file.favorite ? "active" : ""
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(file.id);
                                    }}
                                  >
                                    ★
                                  </span>
                                  {file.name}
                                </>
                              )}
                            </td>
                            <td>{file.type}</td>
                            <td>{file.location}</td>
                            <td style={{ position: "relative" }}>
                              <span>{file.date}</span>
                              <img
                                src="/images/Seemore.png"
                                className="tableimg"
                                onClick={() =>
                                  setActiveMenuId((prev) =>
                                    prev === file.id ? null : file.id
                                  )
                                }
                              />
                              {activeMenuId === file.id && (
                                <div
                                  className="dropdown-menu"
                                  ref={dropdownRef}
                                >
                                  <ul>
                                    <li>
                                      <button
                                        onClick={() => toggleFavorite(file.id)}
                                      >
                                        즐겨찾기
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() =>
                                          handleDownloadZip([file.id])
                                        }
                                      >
                                        압축 다운로드
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() => handleRenameClick(file)}
                                      >
                                        이름 변경
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() =>
                                          moveToSharedDrive(file.id)
                                        }
                                      >
                                        공유 드라이브로 이동
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() => moveToTrash(file.id)}
                                      >
                                        휴지통
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() => setFolderModalOpen(true)}
                                      >
                                        하위 폴더 만들기
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}
