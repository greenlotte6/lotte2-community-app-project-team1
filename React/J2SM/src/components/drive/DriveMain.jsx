import React, { useEffect, useRef, useState } from "react";
import "../../styles/drive/drive.scss";
import { DRIVE_API } from "../../api/_http";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DriveMain = () => {
  const [files, setFiles] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const dropdownRef = useRef();
  const { username, membership, nick } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const res = await fetch(DRIVE_API.LIST, { credentials: "include" });
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error("파일 로드 실패", err);
    }
  };

  const createFolder = async () => {
    if (!folderName.trim()) return alert("폴더명을 입력하세요.");
    try {
      const res = await fetch(DRIVE_API.CREATE_FOLDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: folderName }),
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
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: newName } : f))
    );
    setRenamingId(null);
  };

  const filteredFiles = files.filter((f) => {
    const matchFavorite = showFavoritesOnly
      ? f.favorite === true || f.favorite === 1 || f.favorite === "1"
      : true;
    const matchSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFavorite && matchSearch;
  });

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
          <button
            id="sidebar-new-button"
            className="new-drive"
            onClick={() => setFolderModalOpen(true)}
          >
            + 신규 폴더
          </button>
          <button onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
            {showFavoritesOnly ? "⭐ 전체 보기" : "⭐ 즐겨찾기만"}
          </button>
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
            <tbody>
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    표시할 파일이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredFiles.map((file) => (
                  <tr key={file.id}>
                    <td>{file.user || username}</td>
                    <td>
                      {renamingId === file.id ? (
                        <>
                          <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleRenameConfirm(file.id)
                            }
                          />
                          <button onClick={() => handleRenameConfirm(file.id)}>
                            확인
                          </button>
                        </>
                      ) : (
                        <>
                          <span
                            className={`star-icon ${
                              file.favorite === true ||
                              file.favorite === 1 ||
                              file.favorite === "1"
                                ? "active"
                                : ""
                            }`}
                            onClick={() => toggleFavorite(file.id)}
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
                        <div className="dropdown-menu" ref={dropdownRef}>
                          <ul>
                            <li>
                              <button onClick={() => toggleFavorite(file.id)}>
                                즐겨찾기
                              </button>
                            </li>
                            <li>
                              <button onClick={() => handleDownload(file.id)}>
                                다운로드
                              </button>
                            </li>
                            <li>
                              <button onClick={() => handleRenameClick(file)}>
                                이름 변경
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => moveToSharedDrive(file.id)}
                              >
                                공유 드라이브로 이동
                              </button>
                            </li>
                            <li>
                              <button onClick={() => moveToTrash(file.id)}>
                                휴지통
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DriveMain;
