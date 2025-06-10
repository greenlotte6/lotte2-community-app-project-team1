import React, { useEffect } from "react";

export const MyAside = ({ myPageList = [], onSelectPage }) => {
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

    return () => {
      menuItems.forEach((item) => {
        item.replaceWith(item.cloneNode(true));
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
          {/* MyPage 메뉴 */}
          <React.Fragment>
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <a href="#">MyPage</a>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <ul className="subMenu">
              {myPageList.map((page) => (
                <li key={page.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); // 💥 페이지 이동 막기
                      onSelectPage?.(page);
                    }}
                  >
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          </React.Fragment>

          {/* Share 메뉴 (더미) */}
          <React.Fragment>
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <a href="#">Share</a>
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

          {/* Favorites 메뉴 (더미) */}
          <React.Fragment>
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <a href="#">Favorites</a>
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

          {/* 휴지통 메뉴 (더미) */}
          <React.Fragment>
            <div className="menuItem">
              <img src="/images/Trash 3.svg" alt="users" />
              <a href="#">Trash</a>
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
        </div>
      </div>
    </aside>
  );
};
