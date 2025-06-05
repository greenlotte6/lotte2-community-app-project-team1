import React, { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import TopArea from "../../components/DashBoard/TopArea";
import MidArea from "../../components/DashBoard/MidArea";
import BottomArea from "../../components/DashBoard/BottomArea";
import "../../styles/DashBoard/dashboardMain.scss";
import Aside from "../../components/DashBoard/Aside";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import { Korean } from "flatpickr/dist/l10n/ko.js";

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

  // 캘린더
  useEffect(() => {
    if (calendarRef.current) {
      flatpickr(calendarRef.current, {
        inline: true,
        locale: Korean,
        dateFormat: "Y-m-d",
      });
    }
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
