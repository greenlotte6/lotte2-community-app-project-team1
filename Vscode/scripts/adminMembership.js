document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.getElementById("darkModeToggle");
  const inviteModal = document.getElementById("inviteModal");
  const openModalBtns = document.querySelectorAll(".openInviteModalBtn");
  const closeModalBtn = document.getElementById("inviteCancelBtn");

  //모달
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      inviteModal.style.display = "flex";
    });
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
});
