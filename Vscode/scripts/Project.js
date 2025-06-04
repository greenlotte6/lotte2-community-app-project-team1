document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.getElementById("darkModeToggle");
  const menuItems = document.querySelectorAll(".childArea .menuItem");
  const inviteModal = document.getElementById("inviteModal");
  const openModalBtn = document.getElementById("openInviteModalBtn");
  const closeModalBtn = document.getElementById("inviteCancelBtn");

  // 다크모드 토글
  toggleInput?.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container")?.classList.toggle("dark-mode");
  });

  // 서브메뉴 토글
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const subMenu = item.nextElementSibling;
      if (subMenu && subMenu.classList.contains("subMenu")) {
        subMenu.style.display =
          subMenu.style.display === "block" ? "none" : "block";
      }
    });
  });

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
});
