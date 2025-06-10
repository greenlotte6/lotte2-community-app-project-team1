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

/* 보드 삭제 */

let lastDeletedBoardPlaceholder = null;

function removeBoard(el) {
  const board = el.closest(".board-left") || el.closest(".board-right");
  if (board && confirm("해당 게시판을 삭제하시겠습니까?")) {
    const placeholder = document.createElement("div");
    placeholder.className = board.className;
    placeholder.innerHTML = `<div class="add-new-board" onclick="openBoardCreateModal(this)"><p>+ 자주쓰는 게시판 추가</p></div>`;
    board.replaceWith(placeholder);
    lastDeletedBoardPlaceholder = placeholder;
  }
}

function openBoardCreateModal(placeholderEl) {
  lastDeletedBoardPlaceholder = placeholderEl; // 위치 기억
  document.getElementById("boardModal").style.display = "flex";
}

function createNewBoard() {
  const name = document.getElementById("newBoardName").value.trim();
  if (!name) {
    alert("게시판 이름을 입력해주세요.");
    return;
  }

  if (lastDeletedBoardPlaceholder) {
    const newBoard = document.createElement("div");
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
  document.getElementById("boardModal").style.display = "none";
  document.getElementById("newBoardName").value = "";
}

document.getElementById("openModalBtn").addEventListener("click", () => {
  document.getElementById("boardModal").style.display = "flex";
});

document.getElementById("closeModalBtn").addEventListener("click", () => {
  document.getElementById("boardModal").style.display = "none";
});

function openBoardModal(btn) {
  document.getElementById("boardModal").style.display = "flex";

  // 클릭한 + 버튼이 있는 부모 빈 div 저장
  window.targetEmptyBoard = btn.closest(".empty-board").parentNode;
}

// 메뉴 토글 기능
document.querySelectorAll(".comment-options-button").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    const menu = this.nextElementSibling;
    document.querySelectorAll(".comment-options-menu").forEach((m) => {
      if (m !== menu) m.style.display = "none";
    });
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });
});

// 외부 클릭 시 메뉴 닫기
document.addEventListener("click", () => {
  document.querySelectorAll(".comment-options-menu").forEach((menu) => {
    menu.style.display = "none";
  });
});

// 삭제 기능 예시
document.querySelectorAll(".delete-comment").forEach((button) => {
  button.addEventListener("click", function () {
    const comment = this.closest(".comment");
    comment.remove(); // 삭제 처리
  });
});

// 수정 기능 예시
document.querySelectorAll(".edit-comment").forEach((button) => {
  button.addEventListener("click", function () {
    const commentContent =
      this.closest(".comment").querySelector(".comment-content");
    const originalText = commentContent.textContent;
    const newText = prompt("댓글을 수정하세요:", originalText);
    if (newText !== null && newText.trim() !== "") {
      commentContent.textContent = newText;
    }
  });
});

const openModalBtn = document.getElementById("openModalBtn");
if (openModalBtn) {
  openModalBtn.addEventListener("click", () => {
    document.getElementById("boardModal").style.display = "flex";
  });
}

/* aside 게시판 생성 모달 */
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
    buttons.forEach((btn, i) => btn.classList.toggle("active", i + 1 === page));
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
    rowCheckboxes.forEach((cb) => (cb.checked = selectAllCheckbox.checked));
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

document.querySelectorAll('.menuItem[draggable="true"]').forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", item.dataset.board);
  });
});

const dropZone = document.getElementById("dropZone");

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault(); // 드롭 허용
  dropZone.classList.add("highlight"); // 시각 효과
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("highlight");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("highlight");

  const boardName = e.dataTransfer.getData("text/plain");

  // 여기에 해당 게시판 로드 로직 삽입
  openBoard(boardName);
});

function openBoard(name) {
  alert(`게시판 "${name}" 열기!`);
  // 게시판 로딩/생성 함수 연결
}
