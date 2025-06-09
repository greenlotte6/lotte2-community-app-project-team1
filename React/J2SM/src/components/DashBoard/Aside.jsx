// src/components/Aside.jsx

import React from "react";
import { useLocation, Link } from "react-router-dom";

const Aside = () => {
  const location = useLocation();
  const { pathname } = location;

  // '/dashboard/calendar' 경로일 때 렌더링할 사이드바 내용
  if (pathname === "/dashboard/calendar") {
    return (
      <aside>
        <div className="sidemenu">
          <div className="sideTop">
            <h3>Calendar</h3>
          </div>
          <div className="childArea">
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <Link to="/dashboard/calendar/my">My Calendar</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <ul className="subMenu">
              <li>
                <Link to="/dashboard/calendar/my/dummy1">더미더미더미</Link>
              </li>
              <li>
                <Link to="/dashboard/calendar/my/dummy2">더미더미더미</Link>
              </li>
            </ul>
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <Link to="/dashboard/calendar/social">Social Calendar</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <ul className="subMenu">
              <li>
                <Link to="/dashboard/calendar/social/dummy1">더미더미더미</Link>
              </li>
              <li>
                <Link to="/dashboard/calendar/social/dummy2">더미더미더미</Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    );
  }

  // '/dashboard/calendar' 경로일 때 렌더링할 사이드바 내용
  if (pathname.includes("/dashboard/board")) {
    return (
      <aside>
        <div className="sidemenu">
          <div className="sideTop">
            <h3>B board</h3>
          </div>
          <div className="childArea">
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <Link to="/dashboard/board/main">HOME</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <ul className="subMenu">
              <li>
                <Link to="#">더미더미더미</Link>
              </li>
              <li>
                <Link to="#">더미더미더미</Link>
              </li>
            </ul>
            <div className="side-icon">
              <button className="side-click" id="openModalBtn">
                + New BOARD
              </button>
            </div>
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <Link to="/dashboard/board/list">🔒공지사항</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <ul className="subMenu">
              <li>
                <Link to="#">더미더미더미</Link>
              </li>
              <li>
                <Link to="#">더미더미더미</Link>
              </li>
            </ul>
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <Link to="/dashboard/board/list">사내게시판</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <ul className="subMenu">
              <li>
                <Link to="#">더미더미더미</Link>
              </li>
              <li>
                <Link to="#">더미더미더미</Link>
              </li>
            </ul>
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <Link to="/dashboard/board/list">익명게시판</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <ul className="subMenu">
              <li>
                <Link to="#">더미더미더미</Link>
              </li>
              <li>
                <Link to="#">더미더미더미</Link>
              </li>
            </ul>
  // 드라이브 관련 페이지일 때
  if (pathname.includes("/dashboard/drive")) {
    return (
      <aside>
        <div className="sidemenu">
          <div className="sideTop">Cloud</div>
          <div>
            <button className="new-drive">+ 신규</button>
          </div>

          <div className="childArea">
            <div>
              <img src="/images/Cloudhome.png.png" alt="홈" />
              <Link to="/dashboard/drive">홈</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>

            <div>
              <img src="/images/Mydrive.png" alt="내 드라이브" />
              <Link to="/dashboard/drive">내 드라이브</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>

            <div>
              <img src="/images/Sharedrive.png" alt="공유 드라이브" />
              <Link to="/dashboard/drive">공유 드라이브</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>

            <div>
              <img src="/images/Recent Drive.png" alt="최근 드라이브" />
              <Link to="/dashboard/drive/recent">최근 드라이브</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>

            <div>
              <img src="/images/Critical drive.png" alt="중요 드라이브" />
              <Link to="/dashboard/drive">중요 드라이브</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>

            <div>
              <img src="/images/Wastebasket.png" alt="휴지통" />
              <Link to="/dashboard/drive/delete">휴지통</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <div className="childArea">
              <div>
                <img src="/images/cloud-computing.png" alt="저장용량" />
                <Link to="/dashboard/drive/storage">저장용량</Link>
                <img src="/images/Vector.svg" alt="vector" />
              </div>
            </div>
            <div className="storage">
              <p>4.7GB / 15GB</p>
              <div className="storage-bar">
                <div className="used" style={{ width: "100%" }}></div>
              </div>
              <button className="buy-btn">저장용량 구매</button>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // 그 외 경로일 때 기본 사이드바 내용
  return (
    <aside>
      <div className="sidemenu">
        <div className="sideTop">
          <h3>DashBoard</h3>
        </div>
        <Link to="/dashboard">Home</Link>
      </div>
    </aside>
  );
};

export default Aside;
