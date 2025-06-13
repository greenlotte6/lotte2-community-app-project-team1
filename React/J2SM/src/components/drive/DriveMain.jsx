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
  const [dragOver, setDragOver] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef();
  const dropRef = useRef();
  const { username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const res = await fetch(DRIVE_API.LIST);
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error("파일 로드 실패", err);
    }
  };

  useEffect(() => {
    const btn = document.getElementById("sidebar-new-button");
    const handleClick = () => {
      document.getElementById("hidden-file-input")?.click();
    };
    btn?.addEventListener("click", handleClick);
    return () => btn?.removeEventListener("click", handleClick);
  }, []);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    selectedFiles.forEach((file) => uploadFile(file));
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", username);
    try {
      const res = await fetch(DRIVE_API.UPLOAD, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("업로드 실패");
      await loadFiles();
    } catch (error) {
      console.error("업로드 에러:", error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => uploadFile(file));
  };

  const toggleFavorite = async (id) => {
    await fetch(DRIVE_API.FAVORITE(id), { method: "PATCH" });
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, favorite: !f.favorite } : f))
    );
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

  const renameFile = async (id, name) => {
    await fetch(DRIVE_API.RENAME(id), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
  };

  const handleRenameClick = (file) => {
    setRenamingId(file.id);
    setNewName(file.name);
    setActiveMenuId(null);
  };

  const handleRenameConfirm = (id) => {
    renameFile(id, newName);
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: newName } : f))
    );
    setRenamingId(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") handleRenameConfirm(id);
  };

  const handleDownload = async (id) => {
    try {
      const res = await fetch(DRIVE_API.DOWNLOAD(id), {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        alert("다운로드 실패: 파일이 존재하지 않거나 서버 오류입니다.");
        return;
      }

      const disposition = res.headers.get("content-disposition");
      let filename = "downloaded-file";

      if (disposition) {
        const utf8Match = disposition.match(/filename\*=UTF-8''(.+)/i);
        if (utf8Match) {
          filename = decodeURIComponent(utf8Match[1]);
        }
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("다운로드 실패", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFiles = files.filter((f) => {
    const matchesFavorite = showFavoritesOnly ? f.favorite : true;
    const matchesSearch = f.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFavorite && matchesSearch;
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

  const toggleShowFavorites = () => {
    setShowFavoritesOnly((prev) => !prev);
  };

  const goToTrash = () => {
    navigate("/dashboard/drive/delete");
  };

  return (
    <>
      <input
        type="file"
        id="hidden-file-input"
        multiple
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      <div className="topArea">
        <div className="Title">
          <img src="/images/Cloud.svg" alt="클라우드" />
          <h3>Cloud</h3>
        </div>
        <button onClick={goToTrash}>🗑 휴지통</button>
      </div>

      <div
        className={`cloud-main ${dragOver ? "drag-over" : ""}`}
        ref={dropRef}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <h3>{username}님의 Cloud 저장소입니다.</h3>

        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Cloud 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "6px 10px",
              border: "none",
              backgroundColor: "#f0eaf7",
            }}
          />
        </form>

        <div className="search-type">
          <button
            onClick={toggleShowFavorites}
            className={`new-drive ${showFavoritesOnly ? "active" : ""}`}
          >
            {showFavoritesOnly ? "⭐ 전체 보기" : "⭐ 즐겨찾기만"}
          </button>
        </div>

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
                            onKeyDown={(e) => handleKeyDown(e, file.id)}
                            autoFocus
                          />
                          <button onClick={() => handleRenameConfirm(file.id)}>
                            확인
                          </button>
                        </>
                      ) : (
                        <>
                          <span
                            className={`star-icon ${
                              file.favorite ? "active" : ""
                            }`}
                            onClick={() => toggleFavorite(file.id)}
                            style={{ cursor: "pointer", marginRight: "5px" }}
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
                                {file.favorite ? "즐겨찾기 해제" : "즐겨찾기"}
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
