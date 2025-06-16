import React from "react";

const BoardRightTable = () => {
  return (
    <div className="board-right">
      <div className="board-main_1">
        <div className="board-top_1">
          <h3>익명게시판</h3>
          <a className="add_menu" onclick="removeBoard(this)">
            🗑
          </a>
        </div>
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="title">[중요]사내 일정 공유드립니다.</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td className="title">[중요]사내 일정 공유드립니다.</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
          </tbody>
        </table>
        <div className="pagination">
          <a href="#">MORE</a>
        </div>
      </div>
    </div>
  );
};

export default BoardRightTable;
