// src/components/Aside.jsx

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import BoardModal from "../board/BoardModal"; // 모달 컴포넌트 임포트
import AsideChat from "./aside/AsideChat";
import AsideBoard from "./aside/AsideBoard";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { CATEGORY_LIST } from "../../api/_http";

const Aside = () => {
  const location = useLocation();
  const { pathname } = location;
  const { username, company, role } = useAuth(); // 로그인 정보
  const isAdmin = role === "ADMIN";

  const [hasTodaySchedule, setHasTodaySchedule] = useState(false);

  useEffect(() => {
    const loadTodaySchedules = async () => {
      try {
        const cno = company?.split(":")[0];
        const cate = pathname.includes("/public") ? "public" : "my"; // 구분

        const res = await axios.get(`/api/calendar/${cate}`, {
          withCredentials: true,
        });
        const today = new Date().toISOString().split("T")[0];
        const todayEvents = res.data.filter(
          (e) => e.start <= today && e.end >= today
        );
        setHasTodaySchedule(todayEvents.length > 0);
      } catch (err) {
        console.error("오늘 일정 로딩 실패", err);
      }
    };

    if (pathname.includes("/dashboard/calendar")) {
      loadTodaySchedules();
    }
  }, [pathname]);

  // '/dashboard/calendar' 경로일 때
  if (pathname.includes("/dashboard/calendar")) {
    // 이 안에 로직 설정
    return (
      <aside>
        <div className="sidemenu">
          <div className="sideTop">
            <h3>Calendar</h3>
          </div>
          <div className="childArea">
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <Link to="/dashboard/calendar">My Calendar</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <Link to="/dashboard/calendar/public">Public Calendar</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // '/dashboard/board' 경로일 때

  if (pathname.includes("/dashboard/board")) {
    return <AsideBoard />;
  }

  // '/dashboard/drive' 경로일 때
  if (pathname.includes("/dashboard/drive")) {
    return (
      <aside>
        <div className="sidemenu">
          <div className="sideTop">Cloud</div>
          <div>
            <button id="sidebar-new-button">+ 신규</button>
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
              <Link to="/dashboard/drive/share">공유 드라이브</Link>
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

  // 기본 사이드바
  // '/dashboard/chatting' 경로일 때 렌더링할 사이드바 내용
  if (pathname.includes("/dashboard/chat")) {
    return <AsideChat />;
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
