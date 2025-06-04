document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.getElementById("darkModeToggle");

  // 다크모드 토글
  toggleInput?.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container")?.classList.toggle("dark-mode");
  });
});
