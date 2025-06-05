// src/pages/CalendarPage.jsx

import React, { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import "../../styles/DashBoard/dashboardMain.scss";

import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import { Korean } from "flatpickr/dist/l10n/ko.js";

// ❶ calendar.js 모듈에서 모든 함수를 import
import {
  initCalendar,
  openScheduleModal,
  closeScheduleModal,
  saveSchedule,
  openDetailModal,
  closeDetailModal,
  submitDetailSchedule,
  openViewModal,
  closeViewModal,
  // prevMonth, nextMonth 는 global(window)에 바인딩 됨
} from "../../utils/calendar";

const CalendarPage = () => {
  // [선택적] 실시간 시계와 출퇴근 상태를 state로 관리
  const [currentTime, setCurrentTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // flatpickr 인라인 달력을 붙일 ref (세부 모달 내부)
  const detailCalendarRef = useRef(null);

  useEffect(() => {
    // 1) React 컴포넌트가 마운트되면 initCalendar 호출
    initCalendar("calendar-container");

    // 2) 세부 모달 안 miniCalendar div에 flatpickr 인라인 달력 초기화
    if (detailCalendarRef.current) {
      flatpickr(detailCalendarRef.current, {
        inline: true,
        locale: Korean,
        dateFormat: "Y-m-d",
      });
    }

    // 3) 선택적으로 실시간 시계 업데이트
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 다크모드 토글
  const handleToggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container")?.classList.toggle("dark-mode");
  };

  // 출근/퇴근 이벤트 (화면 상에 보여주고 싶다면 적절히 JSX에 배치하세요)
  const handleCheckIn = () => {
    setStatusMessage(`출근 완료 (${new Date().toLocaleTimeString()})`);
  };
  const handleCheckOut = () => {
    setStatusMessage(`퇴근 완료 (${new Date().toLocaleTimeString()})`);
  };

  return (
    <div className="dashboardMainContent" id="calendar">
      <DashboardLayout>
        <Aside />

        <div className="contentArea">
          {/* ===== 달력 영역 ===== */}
          <div id="calendar-container">
            <div className="calendar-header">
              {/* prevMonth/nextMonth는 global(window)에 바인딩 됨 */}
              <button type="button" onClick={() => window.prevMonth()}>
                ❮
              </button>
              <span id="calendar-title" style={{ margin: "0 40px" }} />
              <button type="button" onClick={() => window.nextMonth()}>
                ❯
              </button>
            </div>

            <table className="calendar-table">
              <thead>
                <tr>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody id="calendar-body">
                {/* initCalendar()이 내부적으로 <tbody>를 채워 줍니다 */}
              </tbody>
            </table>
          </div>

          <div id="schedule-modal" class="modal">
            <div class="modal-content" onclick="event.stopPropagation()">
              <span class="close" onclick="closeModal()">
                &times;
              </span>
              <h3>간편 일정 등록</h3>
              <input type="hidden" id="modal-date" />
              <input
                type="text"
                id="modal-title"
                placeholder="일정 제목 입력"
              />
              <button class="calen" onclick="saveSchedule()">
                등록하기
              </button>
              <button class="calen" onclick="openDetailModal()">
                세부일정등록
              </button>
              <button class="calen" onclick="">
                알람 ON
              </button>
              <button class="calen" onclick="">
                일정 삭제
              </button>
            </div>
          </div>
        </div>

        {/* ===== 세부일정 등록 모달 ===== */}
      </DashboardLayout>
    </div>
  );
};

export default CalendarPage;
