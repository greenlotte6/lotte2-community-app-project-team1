document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.getElementById("darkModeToggle");

  // 🌙 다크모드 토글
  toggleInput?.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container")?.classList.toggle("dark-mode");
  });

  // 👥 샘플 데이터
  const allData = [...Array(100)].map((_, i) => ({
    day: `2025-05-29`,
    method: `신용카드`,
    amount: `34,900`,
    rating: `Premium`,
    status: `정상`,
  }));

  const rowsPerPage = 10;
  let currentPage = 0;

  // 📄 테이블 렌더 함수
  function renderTablePage(page) {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = allData.slice(start, end);

    pageData.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.day}</td>
        <td>${row.method}</td>
        <td>${row.amount}</td>
        <td>${row.rating}</td>
        <td>${row.status}</td>
      `;
      tbody.appendChild(tr);
    });

    updatePaginationHighlight();
  }

  // 🔢 페이지 버튼 자동 생성
  function createPaginationButtons() {
    const pgArea = document.querySelector(".pgArea");
    pgArea.innerHTML = "";

    const totalPages = Math.ceil(allData.length / rowsPerPage);

    for (let i = 0; i < totalPages; i++) {
      const btn = document.createElement("button");
      btn.className = "pg";
      btn.textContent = "";

      btn.addEventListener("click", () => {
        currentPage = i;
        renderTablePage(currentPage);
      });

      pgArea.appendChild(btn);
    }
  }

  // 🎯 현재 페이지 버튼 하이라이트
  function updatePaginationHighlight() {
    const pgButtons = document.querySelectorAll(".pg");
    pgButtons.forEach((btn, index) => {
      btn.classList.toggle("active", index === currentPage);
    });
  }

  // 🖱 휠로 페이지 이동 (너무 민감하지 않게)
  let isScrolling = false;
  const tableContainer = document.getElementById("tableContainer");

  tableContainer.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    isScrolling = true;

    setTimeout(() => {
      isScrolling = false;
    }, 150); // 감도 조절

    if (e.deltaY > 0) {
      // 아래로
      if ((currentPage + 1) * rowsPerPage < allData.length) {
        currentPage++;
        renderTablePage(currentPage);
      }
    } else {
      // 위로
      if (currentPage > 0) {
        currentPage--;
        renderTablePage(currentPage);
      }
    }
  });

  // 초기 실행
  createPaginationButtons();
  renderTablePage(currentPage);
});
