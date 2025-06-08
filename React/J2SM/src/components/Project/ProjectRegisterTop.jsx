import React, { useEffect } from "react";

export const ProjectRegisterTop = () => {
  useEffect(() => {
    const menuItems = document.querySelectorAll(".childArea .menuItem");
    const inviteModal = document.getElementById("inviteModal");
    const openModalBtn = document.getElementById("openInviteModalBtn");
    const closeModalBtn = document.getElementById("inviteCancelBtn");

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

    // 모달 열기
    openModalBtn?.addEventListener("click", () => {
      if (inviteModal) inviteModal.style.display = "flex";
    });

    // 모달 닫기
    closeModalBtn?.addEventListener("click", () => {
      if (inviteModal) inviteModal.style.display = "none";
    });

    // ESC 키로 닫기
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && inviteModal) {
        inviteModal.style.display = "none";
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // 🧹 정리
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      menuItems.forEach((item) => {
        item.replaceWith(item.cloneNode(true)); // 리스너 제거용
      });
    };
  }, []);

  return (
    <>
      <div className="topArea">
        <div className="Title">
          <h3>
            <input type="text" value="새 프로젝트 생성" />
          </h3>
          <button type="button" id="openInviteModalBtn">
            <img src="/images/user-add.svg" alt="useradd" />
          </button>
        </div>
      </div>
      <div
        className="modalOverlay"
        id="inviteModal"
        style={{ display: "none" }}
      >
        <div className="modalContent">
          <div className="list">
            <div className="employeelist">
              <div className="listtop">
                <h3>Employee List</h3>
              </div>
              <div className="childArea">
                <div className="menuItem">
                  <a href="#">진행중인 프로젝트</a>
                </div>
                <ul className="subMenu">
                  <li>
                    <a href="#">더미더미더미</a>
                  </li>
                  <li>
                    <a href="#">더미더미더미</a>
                  </li>
                </ul>
                <div className="menuItem">
                  <a href="#">완료된 프로젝트</a>
                </div>
                <ul className="subMenu">
                  <li>
                    <a href="#">더미더미더미</a>
                  </li>
                  <li>
                    <a href="#">더미더미더미</a>
                  </li>
                </ul>
              </div>
            </div>
            <img src="/images/Arrow right-circle.svg" alt="" />
            <div className="inproject">
              <div className="listtop">
                <h3>In Project</h3>
              </div>
            </div>
          </div>
          <div className="modalButtons">
            <button id="inviteConfirmBtn">초대</button>
            <button id="inviteCancelBtn">취소</button>
          </div>
        </div>
      </div>
    </>
  );
};
