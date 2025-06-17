import React, { useEffect, useState } from "react";
import { DRIVE_API } from "../../api/_http";

const DriveDelete = () => {
  const [trashedFiles, setTrashedFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(DRIVE_API.DELETE_LIST)
      .then((res) => res.json())
      .then((data) => {
        setTrashedFiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("휴지통 데이터 로딩 실패", err);
        setLoading(false);
      });
  }, []);
  const handleRestore = async (fileId) => {
    try {
      const res = await fetch(DRIVE_API.RESTORE(fileId), {
        method: "PUT",
        credentials: "include", // 인증 필요 시
      });
      if (!res.ok) throw new Error("복원 실패");
      setTrashedFiles((prev) => prev.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error("복원 에러:", error);
    }
  };

  const handlePermanentDelete = async (fileId) => {
    try {
      const res = await fetch(DRIVE_API.PERMANENT_DELETE(fileId), {
        method: "DELETE",
        credentials: "include", // 인증 필요 시
      });
      if (!res.ok) throw new Error("완전 삭제 실패");
      setTrashedFiles((prev) => prev.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error("완전 삭제 에러:", error);
    }
  };

  return (
    <>
      <div className="topArea">
        <div className="Title">
          <img src="/images/Cloud.svg" alt="클라우드" />
          <h3>Cloud</h3>
        </div>
      </div>

      <div className="cloud-main">
        <h3>휴지통</h3>

        {/* 검색 영역 */}
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
          <button
            type="submit"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <img src="/images/search.png" alt="검색" className="search-icon" />
          </button>
        </form>

        {/* 필터 영역 */}
        <div className="search-type">
          <select>
            <option>유형▼</option>
          </select>
          <select>
            <option>사람▼</option>
          </select>
          <select>
            <option>수정날짜▼</option>
          </select>
          <select>
            <option>위치▼</option>
          </select>
        </div>

        {/* 파일이 없을 때 */}
        {!loading && trashedFiles.length === 0 && (
          <>
            <div>
              <img
                src="/images/delete_360.png"
                alt="휴지통"
                style={{
                  width: "300px",
                  height: "250px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
            <span
              className="deleteclean"
              style={{
                textAlign: "center",
                fontSize: "25px",
                display: "block",
              }}
            >
              휴지통 비어있음.
            </span>
            <span
              style={{
                textAlign: "center",
                fontSize: "15px",
                display: "block",
              }}
            >
              휴지통으로 이동된 항목은 30일 후 완전히 삭제됩니다.
            </span>
          </>
        )}

        {/* 파일이 있을 때 */}
        {!loading && trashedFiles.length > 0 && (
          <div className="drivetable">
            <table className="drivetables">
              <thead>
                <tr>
                  <th>사용자</th>
                  <th>파일명</th>
                  <th>유형</th>
                  <th>위치</th>
                  <th>삭제일</th>
                  <th>액션</th>
                </tr>
              </thead>
              <tbody>
                {trashedFiles.map((file) => (
                  <tr key={file.id}>
                    <td>{file.user}</td>
                    <td>{file.name}</td>
                    <td>{file.type}</td>
                    <td>{file.location}</td>
                    <td>{file.date}</td>
                    <td>
                      {/* 복원/완전삭제 버튼 */}
                      <button onClick={() => handleRestore(file.id)}>
                        복원
                      </button>
                      <button
                        style={{ color: "red" }}
                        onClick={() => {
                          if (window.confirm("정말로 완전 삭제하시겠습니까?")) {
                            handlePermanentDelete(file.id);
                          }
                        }}
                      >
                        완전 삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default DriveDelete;
