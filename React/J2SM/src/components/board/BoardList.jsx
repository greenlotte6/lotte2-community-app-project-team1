import React, { useState } from "react";
import WriteModal from "./WriteModal"; // 모달 컴포넌트 import
import { Link } from "react-router-dom";

const BoardList = () => {
  const [showWriteModal, setShowWriteModal] = useState(false);

  return (
    <>
      <div className="line"></div>
      <div className="board-main">
        <div className="board-top">
          <select>
            <option>공지사항</option>
            <option>사내게시판</option>
            <option>익명게시판</option>
          </select>
          <div>
            <select>
              <option>전체</option>
              <option>제목</option>
              <option>글쓴이</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              style={{ width: "180px", margin: "0 5px" }}
            />
            <button>검색</button>
          </div>
        </div>

        <div className="board-click">
          <button onClick={() => setShowWriteModal(true)}>글쓰기</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" id="selectAll" />
              </th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
            </tr>
          </thead>
          <tbody>
            {/* 게시글 rows - 생략된 부분은 필요시 loop 처리 가능 */}
            <tr>
              <td>
                <input type="checkbox" className="rowCheckbox" />
              </td>
              <td className="title">
                <Link to="/dashboard/board/view">
                  [공지사항] 사내 워크숍 일정 안내
                </Link>
              </td>
              <td>홍길동</td>
              <td>2025.06.04</td>
              <td>17</td>
            </tr>
          </tbody>
        </table>

        <div id="pagination" className="pagination"></div>
      </div>

      {/* 모달 컴포넌트 조건부 렌더링 */}
      {showWriteModal && (
        <WriteModal onClose={() => setShowWriteModal(false)} />
      )}
    </>
  );
};

export default BoardList;
