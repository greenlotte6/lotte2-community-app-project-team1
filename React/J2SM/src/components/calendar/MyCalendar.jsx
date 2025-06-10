import React, { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";

const Calendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    renderCalendar(currentYear, currentMonth);
  }, [schedules, currentYear, currentMonth]);

  const renderCalendar = (year, month) => {
    if (!calendarRef.current) return;
    const calendarBody = calendarRef.current;
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();
    const prevLastDate = new Date(year, month - 1, 0).getDate();
    const dateCellMap = {};
    const eventCountMap = {};

    calendarBody.innerHTML = "";
    let nextMonthDate = 1;

    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        const cellIndex = i * 7 + j;
        const dayOffset = cellIndex - firstDay;

        if (dayOffset < 0) {
          cell.innerText = prevLastDate + dayOffset + 1;
          cell.classList.add("dim");
        } else if (dayOffset >= lastDate) {
          cell.innerText = nextMonthDate++;
          cell.classList.add("dim");
        } else {
          const currentDate = dayOffset + 1;
          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
            currentDate
          ).padStart(2, "0")}`;
          cell.innerText = currentDate;
          dateCellMap[dateStr] = cell;
          eventCountMap[dateStr] = 0;
          cell.onclick = (e) => openModal(dateStr, e);
        }

        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }

    schedules.forEach((event) => {
      const start = new Date(event.start);
      const end = new Date(event.end);
      const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

      for (let i = 0; i < duration; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);

        const dateStr = currentDate.toISOString().split("T")[0];
        const cell = dateCellMap[dateStr];
        if (!cell) continue;

        const eventIndex = eventCountMap[dateStr]++;
        const div = document.createElement("div");
        div.className = "event";
        div.textContent = i === 0 ? event.title : "";
        div.style.backgroundColor = event.color;
        if (event.note) div.title = event.note;

        Object.assign(div.style, {
          position: "absolute",
          left: "0",
          top: `${20 + eventIndex * 24}px`,
          height: "20px",
          borderRadius: "1px",
          paddingLeft: "1px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "14px",
          textAlign: "center",
          width: "100%",
          zIndex: 1,
        });

        cell.style.position = "relative";
        div.onclick = (e) => {
          e.stopPropagation();
          openViewModal(event);
        };
        cell.appendChild(div);
      }
    });
  };

  const openModal = (dateStr, e) => {
    const modal = document.getElementById("schedule-modal");
    document.getElementById("modal-date").value = dateStr;
    document.getElementById("modal-title").value = "";

    const rect = e.target.getBoundingClientRect();
    modal.style.left = `${rect.left + window.scrollX}px`;
    modal.style.top = `${rect.top + window.scrollY}px`;
    modal.style.display = "block";

    setTimeout(() => document.getElementById("modal-title").focus(), 100);
  };

  const saveSchedule = () => {
    const date = document.getElementById("modal-date").value;
    const title = document.getElementById("modal-title").value;
    if (!title) return alert("일정 제목을 입력하세요.");

    const color = getRandomColor();
    setSchedules([...schedules, { start: date, end: date, title, color }]);
    closeModal();
  };

  const saveDetailSchedule = () => {
    const title = document.getElementById("detail-title").value;
    const start = document.getElementById("start-date").value;
    const end = document.getElementById("end-date").value;
    const place = document.getElementById("place").value;
    const member = document.getElementById("member").value;
    const note = document.getElementById("detail-note").value;

    if (!title || !start || !end) return alert("모든 항목을 입력하세요.");
    const color = getRandomColor();

    setSchedules([
      ...schedules,
      { title, start, end, place, member, note, color },
    ]);
    setShowDetailModal(false);
  };

  const getRandomColor = () => {
    const colors = [
      "#f6b3dc",
      "#a1c4fd",
      "#ffd59e",
      "#c3f584",
      "#c0aaff",
      "#ffaaa5",
      "#ffda77",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const openViewModal = (event) => {
    setSelectedSchedule(event);
    document.getElementById(
      "view-date"
    ).textContent = `${event.start} ~ ${event.end}`;
    document.getElementById("view-title").textContent = event.title;
    document.getElementById("view-place").textContent = event.place || "-";
    document.getElementById("view-member").textContent = event.member || "-";
    document.getElementById("view-note").textContent =
      event.note || "(메모 없음)";
    document.getElementById("view-schedule-modal").style.display = "block";
  };

  const closeModal = () => {
    document.getElementById("schedule-modal").style.display = "none";
  };

  const closeViewModal = () => {
    document.getElementById("view-schedule-modal").style.display = "none";
  };

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  useEffect(() => {
    flatpickr("#start-date", { dateFormat: "Y-m-d" });
    flatpickr("#end-date", { dateFormat: "Y-m-d" });
  }, [showDetailModal]);

  return (
    <div className="calendar-wrappers" style={{ width: "100%" }}>
      <div className="calendar-header">
        <button onClick={prevMonth}>❮</button>
        <span style={{ padding: "0 50px" }}>{`${currentYear}.${String(
          currentMonth
        ).padStart(2, "0")}`}</span>
        <button onClick={nextMonth}>❯</button>
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
        <tbody ref={calendarRef}></tbody>
      </table>

      {/* Schedule Modal */}
      <div id="schedule-modal" className="modal" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h3>간편 일정 등록</h3>
          <input type="hidden" id="modal-date" />
          <input type="text" id="modal-title" placeholder="일정 제목 입력" />
          <button className="calen" onClick={saveSchedule}>
            등록하기
          </button>
          <button className="calen" onClick={() => setShowDetailModal(true)}>
            세부일정등록
          </button>
        </div>
      </div>

      {/* View Modal */}
      <div
        id="view-schedule-modal"
        className="modal-view"
        style={{ display: "none" }}
      >
        <div className="modal-content">
          <span className="close" onClick={closeViewModal}>
            &times;
          </span>
          <h3 style={{ textAlign: "center" }}>일정 상세 보기</h3>
          <p>
            <strong>날짜:</strong> <span id="view-date"></span>
          </p>
          <p>
            <strong>제목:</strong> <span id="view-title"></span>
          </p>
          <p>
            <strong>장소:</strong> <span id="view-place"></span>
          </p>
          <p>
            <strong>참석자:</strong> <span id="view-member"></span>
          </p>
          <p>
            <strong>메모:</strong> <span id="view-note"></span>
          </p>
        </div>
        <div className="s_button" style={{ padding: "20px" }}>
          <button id="edit-button" onClick={() => setShowDetailModal(true)}>
            수정하기
          </button>
        </div>
      </div>

      {/*  */}
      {showDetailModal && (
        <div className="detail-modal" onClick={() => setShowDetailModal(false)}>
          <div
            className="modal-contents"
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", display: "grid", backgroundColor: "aqua" }}
          >
            <span className="closes" onClick={() => setShowDetailModal(false)}>
              &times;
            </span>
            <h3>세부일정 등록</h3>
            <label>일정 제목</label>
            <input
              type="text"
              id="detail-title"
              className="form-input"
              placeholder="일정 제목"
            />
            <label>시작 날짜</label>
            <input type="text" id="start-date" className="form-input" />
            <label>종료 날짜</label>
            <input type="text" id="end-date" className="form-input" />
            <label>장소</label>
            <input
              type="text"
              id="place"
              className="form-input"
              placeholder="장소"
            />
            <label>참석 인원</label>
            <input
              type="text"
              id="member"
              className="form-input"
              placeholder="참석 인원"
            />
            <label>세부 일정</label>
            <textarea
              id="detail-note"
              rows="3"
              placeholder="추가 메모..."
            ></textarea>
            <button className="calen" onClick={saveDetailSchedule}>
              등록
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
