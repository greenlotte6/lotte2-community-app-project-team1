// src/components/drive/ShareDrive.jsx
import React, { useEffect, useRef, useState } from "react";
import "../../styles/drive/drive.scss";
import { DRIVE_API } from "../../api/_http";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ShareDrive() {
  const [files, setFiles] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const dropdownRef = useRef();
  const { username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadSharedFiles();
  }, [currentFolderId]);

  const loadSharedFiles = async () => {
    try {
      const url = currentFolderId
        ? `${DRIVE_API.SHARED_LIST}?parentId=${currentFolderId}`
        : DRIVE_API.SHARED_LIST;
      const res = await fetch(url, { credentials: "include" });
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error("공유 드라이브 파일 로드 실패", err);
    }
  };

  const filtered = files.filter((f) => {
    const fav = showFavoritesOnly ? f.favorite : true;
    const textMatch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return fav && textMatch;
  });

  const reloadAndClose = async (apiCall) => {
    try {
      await apiCall();
      await loadSharedFiles();
      setActiveMenuId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = (id) =>
    reloadAndClose(() =>
      fetch(DRIVE_API.FAVORITE(id), { method: "PATCH", credentials: "include" })
    );

  const handleDownload = (id) =>
    fetch(DRIVE_API.RECENT_VIEW(id), { method: "POST", credentials: "include" })
      .then(() => {
        window.location.href = DRIVE_API.DOWNLOAD(id);
      })
      .catch(console.error);

  const handleDownloadZip = (ids) =>
    reloadAndClose(async () => {
      const q = ids.map((i) => `ids=${i}`).join("&");
      const res = await fetch(`${DRIVE_API.DOWNLOAD_ZIP}?${q}`, {
        method: "GET",
        credentials: "include",
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "shared-files.zip";
      link.click();
    });

  const moveToTrash = (id) =>
    reloadAndClose(() =>
      fetch(DRIVE_API.DELETE(id), { method: "DELETE", credentials: "include" })
    );

  const unshare = (id) =>
    reloadAndClose(() =>
      fetch(DRIVE_API.UNSHARE(id), { method: "PATCH", credentials: "include" })
    );

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
    <div className="cloud-main">
      <h3>공유 드라이브</h3>

      {/* 내 드라이브로 돌아가기 */}
      <button
        onClick={() => navigate("/dashboard/drive")}
        style={{ marginBottom: 16 }}
      >
        ⬅ 내 드라이브로
      </button>

      {/* 루트 공유 드라이브로 돌아가기 */}
      {currentFolderId && (
        <button
          onClick={() => setCurrentFolderId(null)}
          style={{ marginLeft: 8, marginBottom: 16 }}
        >
          ⬅ 루트 공유 드라이브로
        </button>
      )}

      {/* 검색 및 즐겨찾기 필터 */}
      <div className="toolbar" style={{ marginBottom: 16 }}>
        <form
          className="search-bar"
          onSubmit={(e) => e.preventDefault()}
          style={{ flex: 1 }}
        >
          <input
            type="text"
            placeholder="Cloud 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <button
          onClick={() => setShowFavoritesOnly((f) => !f)}
          style={{ marginLeft: 8 }}
        >
          {showFavoritesOnly ? "⭐ 전체 보기" : "⭐ 즐겨찾기만"}
        </button>
      </div>

      {/* 파일 테이블 */}
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
            {filtered.map((file) => (
              <tr key={file.id}>
                <td>{file.user || username}</td>
                <td
                  style={{
                    cursor: file.type === "folder" ? "pointer" : "default",
                  }}
                  onClick={() =>
                    file.type === "folder" && setCurrentFolderId(file.id)
                  }
                >
                  {file.name}
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
                        {/* 누구나 가능 */}
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
                        {/* 본인만 가능 */}
                        {file.user === username && (
                          <>
                            <li>
                              <button
                                onClick={() => handleDownloadZip([file.id])}
                              >
                                압축 다운로드
                              </button>
                            </li>
                            <li>
                              <button onClick={() => moveToTrash(file.id)}>
                                휴지통 이동
                              </button>
                            </li>
                            <li>
                              <button onClick={() => unshare(file.id)}>
                                공유 취소
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
