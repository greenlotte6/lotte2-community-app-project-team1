import React, { useEffect, useState } from "react";

export const MyAside = ({ myPageList = [], onSelectPage }) => {
  const [normalList, setNormalList] = useState([]);
  const [trashList, setTrashList] = useState([]);
  const [isNormalOpen, setIsNormalOpen] = useState(true);
  const [isTrashOpen, setIsTrashOpen] = useState(true);

  useEffect(() => {
    console.log("📦 받은 myPageList:", myPageList);
    myPageList.forEach((p) =>
      console.log(
        `🧪 ${p.title}: isDeleted=${p.isDeleted} (${typeof p.isDeleted})`
      )
    );

    // ✅ 문자열 boolean도 포함해서 필터링
    const active = myPageList.filter((p) => !p.isDeleted); // ← 이걸로 충분
    const trash = myPageList.filter((p) => p.isDeleted);

    setNormalList(active);
    setTrashList(trash);
  }, [myPageList]);

  return (
    <aside>
      <div className="sidemenu">
        <div className="sideTop">
          <h3>MyPage</h3>
        </div>
        <div className="childArea">
          {/* ✅ MyPage 메뉴 */}
          <div
            className="menuItem"
            onClick={() => {
              setIsNormalOpen((prev) => !prev);
              console.log("📂 MyPage 메뉴 열림/닫힘 토글됨");
            }}
          >
            <img src="/images/File text.svg" alt="users" />
            <span>MyPage</span> {/* ✅ <a> 말고 <span>으로 바꿈 */}
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

          {/* ✅ Trash 메뉴 */}
          <div
            className="menuItem"
            onClick={() => setIsTrashOpen(!isTrashOpen)}
          >
            <img src="/images/Trash 3.svg" alt="trash" />
            <a href="#">Trash</a>
            <img src="/images/Vector.svg" alt="vector" />
          </div>
          {isTrashOpen && (
            <ul className="subMenu">
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
