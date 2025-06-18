import React, { useEffect, useRef, useState } from "react";
import { DRIVE_API } from "../../api/_http";
import useAuth from "../../hooks/useAuth"; // ✅ uid 사용을 위해 필요
import "../../styles/drive/drive.scss";

const RecentDrive = () => {
  const [recentFiles, setRecentFiles] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [newName, setNewName] = useState("");
  const dropdownRef = useRef();
  const { username: uid } = useAuth(); // ✅ 로그인 유저 ID

  useEffect(() => {
    const fetchRecentFiles = async () => {
      try {
        const res = await fetch(`${DRIVE_API.RECENT_LIST}?uid=${uid}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("응답이 배열이 아님");
        setRecentFiles(data);
      } catch (err) {
        console.error("최근 드라이브 불러오기 실패", err);
      }
    };
    if (uid) fetchRecentFiles();
  }, [uid]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSameDate = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const groupByDateLabel = (files) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const formatDate = (str) => new Date(str.replaceAll(".", "-"));

    const result = {};
    files.forEach((file) => {
      const date = formatDate(file.date);
      const label = isSameDate(date, today)
        ? "오늘"
        : isSameDate(date, yesterday)
        ? "어제"
        : file.date;
      if (!result[label]) result[label] = [];
      result[label].push(file);
    });
    return result;
  };

  const grouped = groupByDateLabel(recentFiles);

  const toggleFavorite = async (id) => {
    await fetch(DRIVE_API.FAVORITE(id), { method: "PATCH" });
    setRecentFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, favorite: !f.favorite } : f))
    );
    setActiveMenuId(null);
  };

  const handleDownload = async (id) => {
    try {
      // ✅ 열람 기록 저장
      await fetch(`${DRIVE_API.RECENT_VIEW(id)}?uid=${uid}`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("최근 기록 저장 실패", e);
    }

    window.location.href = DRIVE_API.DOWNLOAD(id);
    setActiveMenuId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말로 휴지통으로 이동하시겠습니까?")) return;
    await fetch(DRIVE_API.DELETE(id), { method: "DELETE" });
    setRecentFiles((prev) => prev.filter((f) => f.id !== id));
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

  const handleRenameConfirm = async (id) => {
    await renameFile(id, newName);
    setRecentFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: newName } : f))
    );
    setRenamingId(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") handleRenameConfirm(id);
  };

  return (
    <div className="cloud-main">
      <h3>최근 드라이브</h3>

      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Cloud 검색"
          style={{
            width: "100%",
            padding: "6px 10px",
            border: "none",
            backgroundColor: "#f0eaf7",
          }}
        />
      </form>

      <div className="drivetable">
        {Object.entries(grouped).map(([label, files]) => (
          <table className="drivetables" key={label}>
            <thead>
              <tr>
                <th colSpan="5" style={{ textAlign: "left" }}>
                  {label}
                </th>
              </tr>
              <tr>
                <th>사용자</th>
                <th>파일명</th>
                <th>유형</th>
                <th>위치</th>
                <th>업로드 날짜</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>{file.user}</td>
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
                      className="tableimg"
                      src="/images/Seemore.png"
                      alt="더보기"
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
                            <button onClick={() => handleDelete(file.id)}>
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
        ))}
      </div>
    </div>
  );
};

export default RecentDrive;
