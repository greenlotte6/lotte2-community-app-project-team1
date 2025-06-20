import React, { useEffect, useRef, useState } from "react";
import "../../styles/drive/drive.scss";
import { DRIVE_API } from "../../api/_http";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DriveMain = () => {
  const [files, setFiles] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null); // 🔥 드래그 위치 추적

  const dropdownRef = useRef();
  const { username } = useAuth();
  const navigate = useNavigate();

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

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const reordered = Array.from(filteredFiles);
    const [movedItem] = reordered.splice(sourceIndex, 1);
    reordered.splice(destinationIndex, 0, movedItem);

    // filteredFiles 기준이 아닌 원본 배열 재정렬 필요
    const reorderedIds = reordered.map((item) => item.id);
    const finalOrder = files.slice(); // 원본 복사
    reorderedIds.forEach((id, idx) => {
      const fileIndex = finalOrder.findIndex((f) => f.id === id);
      if (fileIndex > -1) {
        const [file] = finalOrder.splice(fileIndex, 1);
        finalOrder.splice(idx, 0, file);
      }
    });
    // dd

    setFiles(finalOrder);

    await fetch(DRIVE_API.REORDER, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalOrder.map((f) => f.id)),
      credentials: "include",
    });
  };

  const filteredFiles = files.filter((f) => {
    const matchFavorite = showFavoritesOnly ? f.favorite : true;
    const matchSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFavorite && matchSearch;
  });

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", username);
    formData.append("originalName", file.name);
    formData.append("parentId", currentFolderId);

    try {
      const res = await fetch(DRIVE_API.UPLOAD, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) throw new Error("업로드 실패");
      await loadFiles();
    } catch (err) {
      console.error("파일 업로드 실패", err);
    }
  };

  const createFolder = async () => {
    if (!folderName.trim()) return alert("폴더명을 입력하세요.");
    try {
      const res = await fetch(DRIVE_API.CREATE_FOLDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: folderName, parentId: currentFolderId }),
      });
      if (!res.ok) throw new Error("폴더 생성 실패");
      await loadFiles();
      setFolderModalOpen(false);
      setFolderName("");
    } catch (err) {
      console.error("폴더 생성 오류", err);
    }
  };

  const handleDownload = async (id) => {
    try {
      await fetch(DRIVE_API.RECENT_VIEW(id), {
        method: "POST",
        credentials: "include",
      });
      window.location.href = DRIVE_API.DOWNLOAD(id);
    } catch (err) {
      console.error("다운로드 실패", err);
    }
  };

  const toggleFavorite = async (id) => {
    await fetch(DRIVE_API.FAVORITE(id), { method: "PATCH" });
    await loadFiles();
    setActiveMenuId(null);
  };

  const moveToTrash = async (id) => {
    await fetch(DRIVE_API.DELETE(id), { method: "DELETE" });
    await loadFiles();
    setActiveMenuId(null);
  };

  const moveToSharedDrive = async (id) => {
    await fetch(DRIVE_API.MOVE_TO_SHARED(id), { method: "PATCH" });
    await loadFiles();
    setActiveMenuId(null);
  };

  const handleRenameClick = (file) => {
    setRenamingId(file.id);
    setNewName(file.name);
    setActiveMenuId(null);
  };

  const handleRenameConfirm = async (id) => {
    await fetch(DRIVE_API.RENAME(id), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    await loadFiles();
    setRenamingId(null);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
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

      <div className="topArea">
        <div className="Title">
          <img src="/images/Cloud.svg" alt="클라우드" />
          <h3>Cloud</h3>
        </div>
      </div>

      <div className="cloud-main">
        <div className="toolbar">
          <button onClick={() => setFolderModalOpen(true)}>+ 신규 폴더</button>
          <label className="upload-label">
            📤 파일 업로드
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) =>
                e.target.files.length > 0 && uploadFile(e.target.files[0])
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

        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Cloud 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="drivetable">
          <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={(start) => setDraggingIndex(start.source.index)} // 🔥 추적 시작
          >
            <Droppable droppableId="file-list">
              {(provided) => (
                <table className="drivetables">
                  <thead>
                    <tr>
                      <th>사용자</th>
                      <th>파일명</th>
                      <th>유형</th>
                      <th>위치</th>
                      <th>업로드 날짜</th>
                    </tr>
                  </thead>
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {filteredFiles.map((file, index) => {
                      const isMovable =
                        draggingIndex !== null &&
                        (index === draggingIndex - 1 ||
                          index === draggingIndex + 1);
                      return (
                        <Draggable
                          key={file.id}
                          draggableId={String(file.id)}
                          index={index}
                        >
                          {(provided) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={isMovable ? "highlight-movable" : ""}
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
                                      onChange={(e) =>
                                        setNewName(e.target.value)
                                      }
                                      onKeyDown={(e) =>
                                        e.key === "Enter" &&
                                        handleRenameConfirm(file.id)
                                      }
                                    />
                                    <button
                                      onClick={() =>
                                        handleRenameConfirm(file.id)
                                      }
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
                                          onClick={() =>
                                            toggleFavorite(file.id)
                                          }
                                        >
                                          즐겨찾기
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          onClick={() =>
                                            handleDownload(file.id)
                                          }
                                        >
                                          다운로드
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          onClick={() =>
                                            handleRenameClick(file)
                                          }
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
                                          onClick={() =>
                                            setFolderModalOpen(true)
                                          }
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
                      );
                    })}
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
};

export default DriveMain;
