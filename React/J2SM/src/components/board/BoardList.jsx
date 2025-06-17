import React, { useState } from "react";
import WriteModal from "./WriteModal";
import { Link } from "react-router-dom";

const BoardList = () => {
  const [showWriteModal, setShowWriteModal] = useState(false);

  // 예시: 로그인 사용자 uid 및 선택된 카테고리 ID
  const writerUid = "hong123"; // 실제로는 useAuth() 같은 훅에서 가져올 수 있음
  const categoryId = 1; // 현재 게시판의 카테고리 ID

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
            {/* 게시글 rows - 추후 map으로 렌더링 */}
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

      {/* 모달 렌더링 */}
      {showWriteModal && (
        <WriteModal
          onClose={() => setShowWriteModal(false)}
          categoryId={categoryId}
          writerUid={writerUid}
        />
      )}
    </>
  );
};

export default BoardList;
