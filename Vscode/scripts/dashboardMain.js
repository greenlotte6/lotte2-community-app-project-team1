document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.getElementById("darkModeToggle");
  const checkInBtn = document.getElementById("checkInBtn");
  const checkOutBtn = document.getElementById("checkOutBtn");
  const statusMessage = document.getElementById("statusMessage");
  const currentTimeEl = document.getElementById("currentTime");
  const visitArea = document.querySelector(".visitArea");

  // 다크모드 토글
  toggleInput?.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container")?.classList.toggle("dark-mode");
  });

  // 현재 시간 실시간 업데이트
  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    if (currentTimeEl) currentTimeEl.textContent = timeStr;
  }
  setInterval(updateTime, 1000);
  updateTime();

  // 출근 버튼
  checkInBtn?.addEventListener("click", () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    if (statusMessage) statusMessage.textContent = `출근 완료 (${timeStr})`;
  });

  // 퇴근 버튼
  checkOutBtn?.addEventListener("click", () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    if (statusMessage) statusMessage.textContent = `퇴근 완료 (${timeStr})`;
  });

  let isScrolling = false;
  visitArea.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault(); // 기본 세로 스크롤 방지
      visitArea.scrollLeft += e.deltaY; // 휠 내리면 오른쪽으로
    },
    { passive: false }
  );

  flatpickr("#miniCalendar", {
    inline: true,
    locale: "ko",
    dateFormat: "Y-m-d",
  });
});
