document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.getElementById("darkModeToggle");
  const inviteModal = document.getElementById("inviteModal");
  const openModalBtn = document.getElementById("openInviteModalBtn");
  const closeModalBtn = document.getElementById("inviteCancelBtn");

  //모달
  openModalBtn.addEventListener("click", () => {
    inviteModal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    inviteModal.style.display = "none";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      inviteModal.style.display = "none";
    }
  });

  // 🌙 다크모드 토글
  toggleInput?.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container")?.classList.toggle("dark-mode");
  });

  // 👥 샘플 데이터
  const allData = [...Array(100)].map((_, i) => ({
    name: `정상수${i + 1}`,
    email: `email${i}@test.com`,
    phone: `010-0000-${i.toString().padStart(4, "0")}`,
    dept: `Backend`,
    position: `Manager`,
  }));

  const rowsPerPage = 7;
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
        <td><input type="checkbox" class="rowCheckbox" /></td>
        <td><div><img src="/images/user.png" alt="" /><span>${row.name}</span></div></td>
        <td>${row.email}</td>
        <td>${row.phone}</td>
        <td>${row.dept}</td>
        <td>${row.position}</td>
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

  const checkAllBox = document.getElementById("checkAll");
  checkAllBox.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll("#tableBody .rowCheckbox");
    checkboxes.forEach((cb) => (cb.checked = checkAllBox.checked));
  });

  // 초기 실행
  createPaginationButtons();
  renderTablePage(currentPage);
});
