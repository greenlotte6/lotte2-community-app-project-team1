import React from "react";

const BoardList = () => {
  return (
    <>
      <div class="line"></div>
      <div class="board-main">
        <div class="board-top">
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
              style={{ width: "180px", height: "20px" }}
            />
            <button>검색</button>
          </div>
        </div>
        <div class="board-click">
          <button id="openWriteModalBtn">글쓰기</button>
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
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">
                <a href="/view/Board/textboard.html">
                  [공지사항] 사내 워크숍 일정 안내
                </a>
              </td>
              <td>홍길동</td>
              <td>2025.06.04</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">사내 회식 일정(자율)</td>
              <td>홍길동</td>
              <td>2025.06.04</td>
              <td>1924</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">사내 건강검진 일정 공유</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">5월 행사 일정 공유</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">[중요]사내 일정 공유드립니다.</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">사내 회식 일정(자율)</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>1924</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">사내 건강검진 일정 공유</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">5월 행사 일정 공유</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">[중요]사내 일정 공유드립니다.</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">사내 회식 일정(자율)</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>1924</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">사내 건강검진 일정 공유</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">5월 행사 일정 공유</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">[중요]사내 일정 공유드립니다.</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">사내 회식 일정(자율)</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>1924</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">사내 건강검진 일정 공유</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">5월 행사 일정 공유</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">[중요]사내 일정 공유드립니다.</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">사내 회식 일정(자율)</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>1924</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">사내 건강검진 일정 공유</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" class="rowCheckbox" />
              </td>
              <td class="title">5월 행사 일정 공유</td>
              <td>홍길동</td>
              <td>2025.05.24</td>
              <td>17</td>
            </tr>
          </tbody>
        </table>
        <div id="pagination" class="pagination"></div>
      </div>
    </>
  );
};

export default BoardList;
