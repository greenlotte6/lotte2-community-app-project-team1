import React from "react";

const BoardLeftTable = () => {
  return (
    <div class="board-left">
      <div class="board-main_1">
        <div class="board-top_1">
          <h3>사내게시판</h3>
          <a class="add_menu" onclick="removeBoard(this)">
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
              <td class="title">[중요]사내 일정 공유드립니다.</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td class="title">[중요]사내 일정 공유드립니다.</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <a href="#">MORE</a>
        </div>
      </div>
    </div>
  );
};

export default BoardLeftTable;
