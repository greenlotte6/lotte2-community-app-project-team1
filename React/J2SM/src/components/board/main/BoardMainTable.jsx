import React from "react";

const BoardMainTable = () => {
  return (
    <div class="board-main">
      <div class="board-main_1">
        <div class="board-top">
          <h3>공지사항</h3>
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
              <td class="title">[공지사항] 사내 워크숍 일정 안내</td>
              <td>홍길동</td>
              <td>2025.06.04</td>
              <td>17</td>
            </tr>
            <tr>
              <td class="title">사내 회식 일정(자율)</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>1924</td>
            </tr>
            <tr>
              <td class="title">사내 네트워크 조율</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>1924</td>
            </tr>
            <tr>
              <td class="title">금주 식단 안내</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>1924</td>
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

export default BoardMainTable;
