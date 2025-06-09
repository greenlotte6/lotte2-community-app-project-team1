import React from "react";

const DriveDelete = () => {
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

        {/* ✅ 수정된 검색 입력 form */}
        <form className="search-bar" action="/cloud/search" method="get">
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
            style={{
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <img src="/images/search.png" alt="검색" className="search-icon" />
          </button>
        </form>

        <div className="search-type">
          <select>
            <option value="유형">유형▼</option>
            <option value="문서">문서</option>
            <option value="PDF">PDF</option>
            <option value="폴더">폴더</option>
            <option value="이미지">이미지</option>
          </select>
          <select>
            <option value="사람">사람▼</option>
          </select>
          <select>
            <option value="수정날짜">수정날짜▼</option>
            <option value="오늘">오늘</option>
            <option value="지난 7일">지난 7일</option>
            <option value="지난 30일">지난 30일</option>
            <option value="올해(2025)">올해(2025)</option>
            <option value="지난해(2024)">지난해(2024)</option>
          </select>
          <select>
            <option value="위치">위치▼</option>
            <option value="내 드라이브">내 드라이브</option>
            <option value="공유 드라이브">공유 드라이브</option>
            <option value="최근 드라이브">최근 드라이브</option>
            <option value="중요 드라이브">중요 드라이브</option>
            <option value="휴지통">휴지통</option>
          </select>
        </div>

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
            display: "block",
            textAlign: "center",
            fontSize: "25px",
            fontWeight: 400,
          }}
        >
          휴지통 비어있음.
        </span>

        <span
          style={{
            display: "block",
            textAlign: "center",
            fontSize: "15px",
            fontWeight: 300,
          }}
        >
          휴지통으로 이동된 항목은 30일 후 완전히 삭제됩니다.
        </span>
      </div>
    </>
  );
};

export default DriveDelete;
