import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const ProjectAside = () => {
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

    // ESC로 모달 닫기
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && inviteModal) {
        inviteModal.style.display = "none";
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // 💡 클린업 함수 (메모리 누수 방지)
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      menuItems.forEach((item) => {
        item.replaceWith(item.cloneNode(true)); // 간단한 remove listener 방식
      });
    };
  }, []);

  return (
    <>
      <aside>
        <div className="sidemenu">
          <div className="sideTop">
            <h3>Project</h3>
            <div className="addcl">
              <button type="button" id="openInviteModalBtn">
                <img src="/images/Plus.svg" />
                <span>New Project</span>
              </button>
            </div>
          </div>
          <div className="childArea">
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <a href="#">진행중인 프로젝트</a>
              <img src="/images/Vector.svg" alt="vector" />
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
              <img src="/images/File text.svg" alt="users" />
              <a href="#">완료된 프로젝트</a>
              <img src="/images/Vector.svg" alt="vector" />
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
      </aside>
      <div
        className="modalOverlay"
        id="inviteModal"
        style={{ display: "none" }}
      >
        <div className="modalContent">
          <h3>새 프로젝트 생성</h3>
          <input type="text" placeholder="프로젝트 이름 입력" />
          <div className="modalButtons">
            <button id="inviteConfirmBtn">
              <Link to="/dashboard/project/projectRegister">세부 설정</Link>{" "}
            </button>
            <button id="inviteCancelBtn">취소</button>
          </div>
        </div>
      </div>
    </>
  );
};
