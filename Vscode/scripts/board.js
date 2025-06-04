document.addEventListener("DOMContentLoaded", () => {
 const modal = document.getElementById("boardModal");
 const openBtn = document.getElementById("openModalBtn");
 const closeBtn = document.getElementById("closeModalBtn");

    openBtn.addEventListener("click", () => {
        modal.style.display = "flex";
        });

        closeBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.display = "none";
          }
        });
      });
  

/* 게시판 추가 모달 */
 document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("openWriteModalBtn");
    const closeBtn = document.getElementById("closeWriteModalBtn");
    const modal = document.getElementById("writeModal");

    openBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  /* 페이징 처리 */

  document.addEventListener("DOMContentLoaded", () => {
    const rowsPerPage = 10; 
    const table = document.querySelector("table tbody");
    const rows = table.querySelectorAll("tr");
    const pagination = document.getElementById("pagination");

    const totalPages = Math.ceil(rows.length / rowsPerPage);

    function showPage(page) {
      rows.forEach((row, index) => {
        row.style.display =
          index >= (page - 1) * rowsPerPage && index < page * rowsPerPage
            ? ""
            : "none";
      });

      const buttons = pagination.querySelectorAll("button");
      buttons.forEach((btn, i) =>
        btn.classList.toggle("active", i + 1 === page)
      );
    }

    function setupPagination() {
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === 1) btn.classList.add("active");
        btn.addEventListener("click", () => showPage(i));
        pagination.appendChild(btn);
      }
    }

    setupPagination();
    showPage(1);
  });

  /* 체크 박스 */

   document.addEventListener("DOMContentLoaded", () => {
    const selectAllCheckbox = document.getElementById("selectAll");
    const rowCheckboxes = document.querySelectorAll(".rowCheckbox");

    selectAllCheckbox.addEventListener("change", () => {
      rowCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
    });
  });


  let lastDeletedBoardPlaceholder = null;

function removeBoard(el) {
  const board = el.closest('.board-left') || el.closest('.board-right');
  if (board && confirm("해당 게시판을 삭제하시겠습니까?")) {
    const placeholder = document.createElement('div');
    placeholder.className = board.className;
    placeholder.innerHTML = `<div class="add-new-board" onclick="openBoardCreateModal(this)"><p>+ 게시판 추가</p></div>`;
    board.replaceWith(placeholder);
    lastDeletedBoardPlaceholder = placeholder;
  }
}

function openBoardCreateModal(placeholderEl) {
  lastDeletedBoardPlaceholder = placeholderEl; // 위치 기억
  document.getElementById('boardModal').style.display = 'flex';
}


function createNewBoard() {
  const name = document.getElementById('newBoardName').value.trim();
  if (!name) {
    alert('게시판 이름을 입력해주세요.');
    return;
  }

  if (lastDeletedBoardPlaceholder) {
    const newBoard = document.createElement('div');
    newBoard.className = lastDeletedBoardPlaceholder.className;
    newBoard.innerHTML = `
      <div class="board-main_1">
        <div class="board-top">
          <h3>${name}</h3>
          <a class="add_menu" onclick="removeBoard(this)">🗑</a>
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
              <td class="title">새 글 예시</td>
              <td>관리자</td>
              <td>${new Date().toISOString().slice(0, 10)}</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
        <div class="pagination"><a href="#">MORE</a></div>
      </div>
    `;
    lastDeletedBoardPlaceholder.replaceWith(newBoard);
    lastDeletedBoardPlaceholder = null;
  }

  // 모달 닫기 및 초기화
  document.getElementById('boardModal').style.display = 'none';
  document.getElementById('newBoardName').value = '';
}

  document.getElementById('openModalBtn').addEventListener('click', () => {
  document.getElementById('boardModal').style.display = 'flex';
});

document.getElementById('closeModalBtn').addEventListener('click', () => {
  document.getElementById('boardModal').style.display = 'none';
});


function openBoardModal(btn) {
  document.getElementById('boardModal').style.display = 'flex';

  // 클릭한 + 버튼이 있는 부모 빈 div 저장
  window.targetEmptyBoard = btn.closest('.empty-board').parentNode;
}