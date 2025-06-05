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
