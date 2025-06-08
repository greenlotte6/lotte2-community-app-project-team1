import React, { useEffect } from "react";

export const MyAside = () => {
  useEffect(() => {
    const menuItems = document.querySelectorAll(".childArea .menuItem");

    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        const subMenu = item.nextElementSibling;
        if (subMenu && subMenu.classList.contains("subMenu")) {
          subMenu.classList.toggle("open");
        }
      });
    });

    // 💥 메모리 누수 방지용 cleanup
    return () => {
      menuItems.forEach((item) => {
        item.replaceWith(item.cloneNode(true)); // 이벤트 제거
      });
    };
  }, []);

  return (
    <aside>
      <div className="sidemenu">
        <div className="sideTop">
          <h3>MyPage</h3>
        </div>
        <div className="childArea">
          {["MyPage", "Share", "Favorites"].map((label, index) => (
            <React.Fragment key={index}>
              <div className="menuItem">
                <img src="/images/File text.svg" alt="users" />
                <a href="#">{label}</a>
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
            </React.Fragment>
          ))}
        </div>
      </div>
    </aside>
  );
};
