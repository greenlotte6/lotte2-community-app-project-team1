import React, { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import "../../styles/DashBoard/calendar.scss";
import {
  getCalendar,
  postCalendar,
  deleteCalendar,
  putCalendar,
} from "../../api/calendar";

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

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const data = await getCalendar();
        setSchedules(data);

        console.log(data);
      } catch (err) {
        console.error("일정 불러오기 실패", err);
      }
    };

    loadSchedules();
  }, []);
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
    const titleInput = document.getElementById("modal-title");
    const dateInput = document.getElementById("modal-date");

    if (!modal || !titleInput || !dateInput) return;

    dateInput.value = dateStr;
    titleInput.value = "";

    // 모달 위치 계산
    if (e) {
      const modalWidth = 300;
      const modalHeight = 220;
      const rect = e.target.getBoundingClientRect();

      let x = rect.left + window.scrollX - 480;
      let y = rect.top + window.scrollY - modalHeight + 140;

      if (x + modalWidth > window.innerWidth + window.scrollX) {
        x = window.innerWidth + window.scrollX - modalWidth - 10;
      }
      if (y < window.scrollY + 10) {
        y = rect.bottom + window.scrollY + 10;
      }

      x = Math.max(1, Math.min(x, window.innerWidth - modalWidth - 10));
      y = Math.max(10, Math.min(y, window.innerHeight - modalHeight - 10));

      modal.style.left = `${x}px`;
      modal.style.top = `${y}px`;
    } else {
      // 기본 중앙 배치 fallback
      modal.style.left = `calc(50% - 150px)`; // modalWidth / 2
      modal.style.top = `calc(50% - 110px)`; // modalHeight / 2
    }

    modal.style.display = "block";

    setTimeout(() => {
      titleInput.focus();
    }, 100);
  };

  const saveSchedule = async () => {
    const date = document.getElementById("modal-date").value;
    const title = document.getElementById("modal-title").value;
    if (!title) return alert("일정 제목을 입력하세요.");

    const color = getRandomColor();
    const newSchedule = {
      start: date,
      end: date,
      title,
      color,
      place: "",
      member: "",
      note: "",
    };

    try {
      const savedEvent = await postCalendar(newSchedule);
      setSchedules((prev) => [...prev, savedEvent]);
      closeModal(); // 모달 닫기 호출 OK
    } catch (error) {
      alert("일정 저장에 실패했습니다.");
    }
  };

  const saveDetailSchedule = async () => {
    const title = document.getElementById("detail-title").value;
    const start = document.getElementById("start-date").value;
    const end = document.getElementById("end-date").value;
    const place = document.getElementById("place").value;
    const member = document.getElementById("member").value;
    const note = document.getElementById("detail-note").value;

    if (!title || !start || !end) return alert("모든 항목을 입력하세요.");

    const color = selectedSchedule?.color || getRandomColor(); // 기존 색 유지
    const updatedSchedule = { title, start, end, place, member, note, color };

    try {
      if (editMode && selectedSchedule?.id) {
        const updated = await putCalendar(selectedSchedule.id, updatedSchedule);
        setSchedules((prev) =>
          prev.map((sch) => (sch.id === selectedSchedule.id ? updated : sch))
        );
      } else {
        const savedEvent = await postCalendar(updatedSchedule);
        setSchedules([...schedules, savedEvent]);
      }

      setShowDetailModal(false);
      setEditMode(false);
      setSelectedSchedule(null);
    } catch (error) {
      alert("일정 저장에 실패했습니다.");
      console.error(error);
    }
  };

  const [editMode, setEditMode] = useState(false);
  const onClickEdit = () => {
    if (!selectedSchedule) return;
    setShowDetailModal(true);
    setEditMode(true);

    setTimeout(() => {
      document.getElementById("detail-title").value = selectedSchedule.title;
      document.getElementById("start-date").value = selectedSchedule.start;
      document.getElementById("end-date").value = selectedSchedule.end;
      document.getElementById("place").value = selectedSchedule.place || "";
      document.getElementById("member").value = selectedSchedule.member || "";
      document.getElementById("detail-note").value =
        selectedSchedule.note || "";
    }, 0);
  };

  const deleteSchedule = async () => {
    if (!selectedSchedule || !selectedSchedule.id) return;

    const confirmDelete = window.confirm("이 일정을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteCalendar(selectedSchedule.id);
      setSchedules((prev) =>
        prev.filter((schedule) => schedule.id !== selectedSchedule.id)
      );
      closeViewModal(); // 상세보기 모달 닫기
    } catch (error) {
      alert("일정 삭제에 실패했습니다.");
    }
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
    const modal = document.getElementById("schedule-modal");
    if (modal) {
      modal.style.display = "none";
    }

    // 입력 초기화
    const titleInput = document.getElementById("modal-title");
    if (titleInput) titleInput.value = "";

    const dateInput = document.getElementById("modal-date");
    if (dateInput) dateInput.value = "";
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
  const closeDetailModal = () => {
    setShowDetailModal(false);
    setEditMode(false);
    setSelectedSchedule(null);
  };

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  useEffect(() => {
    if (showDetailModal && startDateRef.current && endDateRef.current) {
      flatpickr(startDateRef.current, { dateFormat: "Y-m-d" });
      flatpickr(endDateRef.current, { dateFormat: "Y-m-d" });
    }
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
          <button id="edit-button" onClick={onClickEdit}>
            수정하기
          </button>
          <button id="delete-button" onClick={deleteSchedule}>
            삭제하기
          </button>
        </div>
      </div>

      {/*  */}
      {showDetailModal && (
        <div className="detail-modal" onClick={() => setShowDetailModal(false)}>
          <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
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
            <input
              type="text"
              id="start-date"
              className="form-input"
              ref={startDateRef}
            />
            <label>종료 날짜</label>
            <input
              type="text"
              id="end-date"
              className="form-input"
              ref={endDateRef}
            />
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
