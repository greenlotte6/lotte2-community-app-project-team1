import React, { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import TopArea from "../../components/DashBoard/TopArea";
import MidArea from "../../components/DashBoard/MidArea";
import BottomArea from "../../components/DashBoard/BottomArea";
import "../../styles/DashBoard/dashboardMain.scss";
import Aside from "../../components/DashBoard/Aside";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { SOCIAL_TOKEN } from "../../api/_http";

const DashboardPage = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const visitAreaRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    // 실시간 시간 갱신
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 휠 스크롤 가로 처리
  useEffect(() => {
    const area = visitAreaRef.current;
    const onWheel = (e) => {
      e.preventDefault();
      area.scrollLeft += e.deltaY;
    };

    if (area) {
      area.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
      area?.removeEventListener("wheel", onWheel);
    };
  }, []);

  // 다크모드 토글
  const handleToggleDarkMode = (e) => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container")?.classList.toggle("dark-mode");
  };

  const handleCheckIn = () => {
    setStatusMessage(`출근 완료 (${new Date().toLocaleTimeString()})`);
  };

  const handleCheckOut = () => {
    setStatusMessage(`퇴근 완료 (${new Date().toLocaleTimeString()})`);
  };

  const { login } = useAuth();

  useEffect(() => {
    axios
      .get(SOCIAL_TOKEN, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("인증됨", res.data);
        const data = res.data;
        console.log(res.data.uid);

        if (res.data.uid) {
          // context login 호출
          login(
            res.data.uid,
            decodeURIComponent(res.data.department),
            decodeURIComponent(res.data.company),
            res.data.nick,
            res.data.membership
          );

          // 메인 이동(컴포넌트 라우팅)
          navigate("/dashboard/main");
        }
      })
      .catch((err) => {
        console.error("인증 실패 또는 쿠키 없음", err);
      });
  }, []);

  return (
    <div className="dashboardMainContent">
      <DashboardLayout>
        <Aside />
        <div className="contentArea">
          <TopArea />
          <MidArea />
          <BottomArea />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default DashboardPage;
