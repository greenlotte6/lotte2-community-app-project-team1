// src/pages/CalendarPage.jsx

import React, { useState, useRef, useEffect } from "react";
import {
  initCalendar,
  openScheduleModalWithDate,
  closeScheduleModal,
  saveSchedule,
  openDetailModal,
  closeDetailModal,
  submitDetailSchedule,
  openViewModal,
  closeViewModal,
} from "../../utils/calendar";

// flatpickr & locale import
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import { Korean } from "flatpickr/dist/l10n/ko.js";

const MyCalendar = () => {
  // [선택적] 실시간 시계와 출퇴근 상태를 state로 관리
  const [currentTime, setCurrentTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // flatpickr 인라인 달력을 붙일 ref (세부 모달 내부)
  const detailCalendarRef = useRef(null);

  useEffect(() => {
    // 1) 컴포넌트가 마운트되면 달력 초기화
    initCalendar("calendar-container");

    // 2) 세부 모달 안 inline flatpickr 붙이기
    if (detailCalendarRef.current) {
      flatpickr(detailCalendarRef.current, {
        inline: true,
        locale: Korean,
        dateFormat: "Y-m-d",
      });
    }

    // 3) (선택) 실시간 시계 업데이트
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 다크모드 토글 예시 (버튼 등을 추가하여 호출 가능)
  const handleToggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container")?.classList.toggle("dark-mode");
  };

  return (
    <>
      {/* ===== 달력 영역 ===== */}
      <div id="calendar-container">
        <div className="calendar-header">
          {/* prevMonth/nextMonth는 initCalendar 내부에서 window에 바인딩됩니다 */}
          <button onClick={() => window.prevMonth()}>❮</button>
          <span id="calendar-title" style={{ margin: "0 40px" }} />
          <button onClick={() => window.nextMonth()}>❯</button>
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

      {/* ===== 간편 일정 등록 모달 ===== */}
      <div
        id="schedule-modal"
        className="modal"
        onClick={() => closeScheduleModal()}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()} /* 내부 클릭 시 버블링 방지 */
        >
          <span className="close" onClick={() => closeScheduleModal()}>
            &times;
          </span>

          <h3>간편 일정 등록</h3>
          {/* hidden input#modal-date ← openScheduleModalWithDate()에서 세팅 */}
          <input type="hidden" id="modal-date" />

          <input type="text" id="modal-title" placeholder="일정 제목 입력" />

          <button className="calen" onClick={() => saveSchedule()}>
            등록하기
          </button>

          <button className="calen" onClick={() => openDetailModal()}>
            세부일정등록
          </button>

          <button
            className="calen"
            onClick={() => {
              /* 알람 로직 */
            }}
          >
            알람 ON
          </button>

          <button
            className="calen"
            onClick={() => {
              /* 삭제 로직 */
            }}
          >
            일정 삭제
          </button>
        </div>
      </div>
      {/* ===== 간편 일정 등록 모달 끝 ===== */}

      {/* ===== 세부일정 등록 모달 (DetailModal) ===== */}
      <div
        id="detail-schedule-modal"
        className="modal"
        onClick={() => closeDetailModal()}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={() => closeDetailModal()}>
            &times;
          </span>
          <h3>세부 일정 등록/수정</h3>
          <div className="detail-inputs">
            <label>
              제목:&nbsp;
              <input type="text" id="detail-title" />
            </label>
          </div>
          <div className="detail-inputs">
            <label>
              시작일:&nbsp;
              <input type="text" id="start-date" />
            </label>
          </div>
          <div className="detail-inputs">
            <label>
              종료일:&nbsp;
              <input type="text" id="end-date" />
            </label>
          </div>
          <div className="detail-inputs">
            <label>
              장소:&nbsp;
              <input type="text" id="place" />
            </label>
          </div>
          <div className="detail-inputs">
            <label>
              구성원:&nbsp;
              <input type="text" id="member" />
            </label>
          </div>
          <div className="detail-inputs">
            <label>
              메모:&nbsp;
              <textarea id="detail-note" rows={3}></textarea>
            </label>
          </div>
          <button className="calen" onClick={() => submitDetailSchedule()}>
            저장하기
          </button>

          {/* inline flatpickr이 붙을 div */}
          <div ref={detailCalendarRef} className="inline-calendar"></div>
        </div>
      </div>
      {/* ===== 세부일정 등록 모달 끝 ===== */}

      {/* ===== 일정 보기 모달 (ViewModal) ===== */}
      <div
        id="view-schedule-modal"
        className="modal"
        onClick={() => closeViewModal()}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={() => closeViewModal()}>
            &times;
          </span>

          <h3>일정 보기</h3>
          <p>
            <strong>기간:</strong>{" "}
            <span id="view-date">2025-06-01 ~ 2025-06-01</span>
          </p>
          <p>
            <strong>제목:</strong> <span id="view-title">예시 일정 제목</span>
          </p>
          <p>
            <strong>장소:</strong> <span id="view-place">-</span>
          </p>
          <p>
            <strong>구성원:</strong> <span id="view-member">-</span>
          </p>
          <p>
            <strong>메모:</strong> <span id="view-note">(메모 없음)</span>
          </p>
          <button className="calen" onClick={() => openDetailModal()}>
            수정
          </button>
        </div>
      </div>
      {/* ===== 일정 보기 모달 끝 ===== */}
    </>
  );
};

export default MyCalendar;
