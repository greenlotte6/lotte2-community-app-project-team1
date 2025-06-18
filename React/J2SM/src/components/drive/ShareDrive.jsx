import React from "react";

const ShareDrive = () => {
  return (
    <div className="cloud-main">
      <h3>공유 드라이브</h3>

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
          style={{ background: "none", border: "none", padding: 0 }}
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
            {Array.from({ length: 6 }).map((_, index) => (
              <tr key={index}>
                <td>minhyeok</td>
                <td>000보고서</td>
                <td>문서</td>
                <td>공유 드라이브</td>
                <td style={{ position: "relative" }}>
                  <span>2020.00.00</span>
                  <img
                    className="tableimg"
                    src="/images/Seemore.png"
                    alt="더보기"
                  />
                  <div className="dropdown-menu">
                    <ul>
                      <li>
                        <button type="button" className="favorite-btn">
                          즐겨찾기
                        </button>
                      </li>
                      <li>
                        <button type="button" className="download-btn">
                          다운로드
                        </button>
                      </li>
                      <li>
                        <button type="button" className="rename-btn">
                          이름 변경
                        </button>
                      </li>
                      <li>
                        <button type="button" className="delete-btn">
                          휴지통
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShareDrive;
