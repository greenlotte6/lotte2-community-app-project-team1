import React, { useState } from "react";

export const MyAside = ({
  normalList = [],
  trashList = [],
  favoriteList = [],
  onSelectPage,
}) => {
  const [isNormalOpen, setIsNormalOpen] = useState(true);
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);

  return (
    <aside>
      <div className="sidemenu">
        <div className="sideTop">
          <h3>MyPage</h3>
        </div>
        <div className="childArea">
          {/* MyPage 메뉴 */}
          <div
            className="menuItem"
            onClick={() => setIsNormalOpen((prev) => !prev)}
          >
            <img src="/images/File text.svg" alt="users" />
            <span>MyPage</span>
            <img src="/images/Vector.svg" alt="vector" />
          </div>
          {isNormalOpen && (
            <ul className={`subMenu ${isNormalOpen ? "open" : ""}`}>
              {normalList.map((page) => (
                <li key={page.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectPage(page);
                    }}
                  >
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {/* Favorite 메뉴 */}
          <div
            className="menuItem"
            onClick={() => setIsFavoriteOpen((prev) => !prev)}
          >
            <img src="/images/File text.svg" alt="favorite" />
            <span>Favorites</span>
            <img src="/images/Vector.svg" alt="vector" />
          </div>
          {isFavoriteOpen && favoriteList.length > 0 && (
            <ul className={`subMenu ${isFavoriteOpen ? "open" : ""}`}>
              {favoriteList.map((page) => (
                <li key={page.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectPage(page);
                    }}
                  >
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {/* Trash 메뉴 */}
          <div
            className="menuItem"
            onClick={() => setIsTrashOpen(!isTrashOpen)}
          >
            <img src="/images/Trash 3.svg" alt="trash" />
            <span>Trash</span>
            <img src="/images/Vector.svg" alt="vector" />
          </div>
          {isTrashOpen && trashList.length > 0 && (
            <ul className={`subMenu ${isTrashOpen ? "open" : ""}`}>
              {trashList.map((page) => (
                <li key={page.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectPage(page);
                    }}
                  >
                    {page.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};
