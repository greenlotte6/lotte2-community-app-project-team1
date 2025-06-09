import React, { useEffect, useRef, useState } from "react";
import "../../styles/drive/drive.scss";

const DriveMain = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      user: "minhyeok",
      name: "000보고서",
      type: "문서",
      location: "내 드라이브",
      date: "2020.00.00",
      favorite: false,
    },
    {
      id: 2,
      user: "minhyeok",
      name: "보고서B",
      type: "PDF",
      location: "공유 드라이브",
      date: "2021.00.00",
      favorite: true,
    },
  ]);

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [newName, setNewName] = useState("");
  const dropdownRef = useRef();

  const toggleMenu = (id) => {
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  const toggleFavorite = (id) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, favorite: !file.favorite } : file
      )
    );
    setActiveMenuId(null);
  };

  const toggleShowFavorites = () => {
    setShowFavoritesOnly((prev) => !prev);
  };

  const handleRenameClick = (file) => {
    setRenamingId(file.id);
    setNewName(file.name);
    setActiveMenuId(null);
  };

  const handleRenameConfirm = (id) => {
    setFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, name: newName } : file))
    );
    setRenamingId(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleRenameConfirm(id);
    }
  };

  const filteredFiles = showFavoritesOnly
    ? files.filter((file) => file.favorite)
    : files;

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
      <div className="topArea">
        <div className="Title">
          <img src="/images/Cloud.svg" alt="클라우드" />
          <h3>Cloud</h3>
        </div>
      </div>

      <div className="cloud-main">
        <h3>Cloud 저장소 입니다.</h3>

        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            id="query"
            name="query"
            placeholder="Cloud 검색"
            style={{
              width: "100%",
              padding: "6px 10px",
              border: "none",
              backgroundColor: "#f0eaf7",
            }}
          />
          <button
            type="submit"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <img src="/images/search.png" alt="검색" className="search-icon" />
          </button>
        </form>

        <div className="search-type">
          <button
            type="button"
            onClick={toggleShowFavorites}
            className="new-drive"
            style={{
              marginTop: "10px",
              fontSize: "14px",
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            {showFavoritesOnly ? "전체 보기" : "즐겨찾기만 보기"}
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
                <th>업로드 날짜(수정날짜)</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    즐겨찾기가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredFiles.map((file) => (
                  <tr key={file.id}>
                    <td>{file.user}</td>
                    <td>
                      {renamingId === file.id ? (
                        <>
                          <input
                            className="rename-input active"
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
                        alt="더보기"
                        className="tableimg"
                        onClick={() => toggleMenu(file.id)}
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
                              <button>다운로드</button>
                            </li>
                            <li>
                              <button onClick={() => handleRenameClick(file)}>
                                이름 변경
                              </button>
                            </li>
                            <li>
                              <button>휴지통</button>
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
