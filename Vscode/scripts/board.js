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