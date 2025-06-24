// src/components/drive/ShareDrive.jsx
import React, { useEffect, useRef, useState } from "react";
import "../../styles/drive/drive.scss";
import { DRIVE_API } from "../../api/_http";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ShareDrive() {
  const [files, setFiles] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(null); // ← 추가
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const dropdownRef = useRef();
  const { username } = useAuth();
  const navigate = useNavigate();

  // 마운트 및 currentFolderId 변경 시 호출
  useEffect(() => {
    loadSharedFiles();
  }, [currentFolderId]);

  const loadSharedFiles = async () => {
    try {
      // parentId 있으면 쿼리 스트링으로, 없으면 모든 공유된 루트
      const url = currentFolderId
        ? `${DRIVE_API.LIST}?parentId=${currentFolderId}`
        : DRIVE_API.LIST;
      const res = await fetch(url, { credentials: "include" });
      const all = await res.json();
      // location이 "공유 드라이브"인 항목만 필터
      setFiles(all.filter((f) => f.location === "공유 드라이브"));
    } catch (err) {
      console.error("공유 드라이브 파일 로드 실패", err);
    }
  };

  // 즐겨찾기/검색 필터
  const filtered = files.filter((f) => {
    const fav = showFavoritesOnly ? f.favorite : true;
    const text = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return fav && text;
  });

  // API 호출 후 목록 갱신 + 메뉴 닫기
  const reloadAndClose = async (apiCall) => {
    try {
      await apiCall();
      await loadSharedFiles();
      setActiveMenuId(null);
    } catch (err) {
      console.error(err);
    }
  };

  // 액션 핸들러
  const toggleFavorite = (id) =>
    reloadAndClose(() =>
      fetch(DRIVE_API.FAVORITE(id), { method: "PATCH", credentials: "include" })
    );
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
  const handleDownload = (id) =>
    fetch(DRIVE_API.RECENT_VIEW(id), { method: "POST", credentials: "include" })
      .then(() => {
        window.location.href = DRIVE_API.DOWNLOAD(id);
      })
      .catch(console.error);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="cloud-main">
      <h3>공유 드라이브</h3>

      {/* 상위 폴더로 이동 버튼 */}
      {currentFolderId && (
        <button
          onClick={() => setCurrentFolderId(null)}
          style={{ marginBottom: 16 }}
        >
          ⬅ 루트 공유 드라이브로
        </button>
      )}

      {/* 검색 & 즐겨찾기 필터 */}
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
                  onClick={() => {
                    if (file.type === "folder") {
                      setCurrentFolderId(file.id); // ← 폴더 클릭 시 내부로
                    }
                  }}
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
                        <li>
                          <button onClick={() => toggleFavorite(file.id)}>
                            {file.favorite ? "즐겨찾기 해제" : "즐겨찾기"}
                          </button>
                        </li>
                        <li>
                          <button onClick={() => handleDownloadZip([file.id])}>
                            압축 다운로드
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              if (file.type !== "folder") {
                                handleDownload(file.id);
                              }
                            }}
                          >
                            다운로드
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
