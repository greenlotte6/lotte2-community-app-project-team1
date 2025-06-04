document.addEventListener("DOMContentLoaded", () => {
  // 드롭다운 메뉴 토글
  document.querySelectorAll(".tableimg").forEach((img) => {
    img.addEventListener("click", (event) => {
      event.stopPropagation(); // 필수!
      const dropdown =
        event.target.parentElement.querySelector(".dropdown-menu");
      if (!dropdown) return;

      const isVisible = window.getComputedStyle(dropdown).display === "block";

      // 모든 드롭다운 닫기
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.style.display = "none";
      });

      // 클릭한 드롭다운 토글
      dropdown.style.display = isVisible ? "none" : "block";
    });
  });

  // 즐겨찾기 버튼 이벤트
  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation(); // 이것도 필수!
    });
  });

  // 외부 클릭 시 모든 드롭다운 닫기
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.style.display = "none";
    });
  });

  // 다크모드 토글
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const container = document.querySelector(".container");
  const main = document.querySelector("main");

  // 페이지 로드 시 이전에 저장된 다크모드 상태 불러오기
  if (toggle) {
    if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode");
      if (container) container.classList.add("dark-mode");
      if (main) main.classList.add("dark-mode");
      toggle.checked = true;
    }

    toggle.addEventListener("change", function () {
      if (this.checked) {
        body.classList.add("dark-mode");
        if (container) container.classList.add("dark-mode");
        if (main) main.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
      } else {
        body.classList.remove("dark-mode");
        if (container) container.classList.remove("dark-mode");
        if (main) main.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
      }
    });
  }
});
