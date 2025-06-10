let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
let schedules = [];

function renderCalendar(year, month) {
  const calendarBody = document.getElementById("calendar-body");
  const title = document.getElementById("calendar-title");
  title.innerText = `${year}.${String(month).padStart(2, "0")}`;
  calendarBody.innerHTML = "";

  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();
  const prevLastDate = new Date(year, month - 1, 0).getDate();

  let nextMonthDate = 1;
  const dateCellMap = {};
  const eventCountMap = {}; // 날짜별 이벤트 수 카운트

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      const cellIndex = i * 7 + j;
      const dayOffset = cellIndex - firstDay;

      if (dayOffset < 0) {
        const day = prevLastDate + dayOffset + 1;
        cell.innerText = day;
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

        cell.onclick = (e) => openModal(year, month, currentDate, e);
      }

      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }

  // 일정 렌더링
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

      div.style.position = "absolute";
      div.style.left = "0";
      div.style.top = `${20 + eventIndex * 24}px`; // 쌓이는 방식으로 위치 계산
      div.style.height = "20px";
      div.style.borderRadius = "1px";
      div.style.paddingLeft = "1px";
      div.style.whiteSpace = "nowrap";
      div.style.overflow = "hidden";
      div.style.textOverflow = "ellipsis";
      div.style.fontSize = "14px";
      div.style.textAlign = "center";
      div.style.width = "100%";
      div.style.zIndex = 1;

      cell.style.position = "relative";

      div.onclick = (e) => {
        e.stopPropagation();
        openViewModal(event);
      };

      cell.appendChild(div);
    }
  });
}

let flatpickrStart = null;
let flatpickrEnd = null;

function openModal(year, month, date, clickEvent = null) {
  const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
    date
  ).padStart(2, "0")}`;
  const modal = document.getElementById("schedule-modal");
  document.getElementById("modal-date").value = formattedDate;
  document.getElementById("modal-title").value = "";

  if (clickEvent) {
    const modalWidth = 300;
    const modalHeight = 220;
    const rect = clickEvent.target.getBoundingClientRect();

    let x = rect.left + window.scrollX - 500;
    let y = rect.top + window.scrollY - modalHeight + 120;

    if (x + modalWidth > window.innerWidth + window.scrollX) {
      x = window.innerWidth + window.scrollX - modalWidth - 10;
    }
    if (y < window.scrollY + 10) {
      y = rect.bottom + window.scrollY + 10;
    }

    modal.style.left = `${x}px`;
    modal.style.top = `${y}px`;
  }

  modal.style.display = "block";
  setTimeout(() => {
    document.getElementById("modal-title").focus();
  }, 100);
}

function closeModal() {
  document.getElementById("schedule-modal").style.display = "none";
}

function saveSchedule() {
  const date = document.getElementById("modal-date").value;
  const title = document.getElementById("modal-title").value;
  if (!title) return alert("일정 제목을 입력하세요.");

  const color = getRandomColor();

  schedules.push({
    start: date,
    end: date,
    title,
    color,
  });

  closeModal();
  renderCalendar(currentYear, currentMonth);
}

function prevMonth() {
  if (currentMonth === 1) {
    currentMonth = 12;
    currentYear--;
  } else {
    currentMonth--;
  }
  renderCalendar(currentYear, currentMonth);
}

function nextMonth() {
  if (currentMonth === 12) {
    currentMonth = 1;
    currentYear++;
  } else {
    currentMonth++;
  }
  renderCalendar(currentYear, currentMonth);
}

function getRandomColor() {
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
}

window.addEventListener("click", function (event) {
  const scheduleModal = document.getElementById("schedule-modal");
  const detailModal = document.getElementById("detail-schedule-modal");
  if (event.target === scheduleModal) closeModal();
  if (event.target === detailModal) closeDetailModal();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
    closeViewModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar(currentYear, currentMonth);
});

function openDetailModal(schedule = null) {
  closeModal();

  const modal = document.getElementById("detail-schedule-modal");

  if (schedule) {
    document.getElementById("detail-title").value = schedule.title || "";
    document.getElementById("start-date").value = schedule.start || "";
    document.getElementById("end-date").value = schedule.end || "";
    document.getElementById("place").value = schedule.place || "";
    document.getElementById("member").value = schedule.member || "";
    document.getElementById("detail-note").value = schedule.note || "";
  } else {
    document.getElementById("detail-title").value = "";
    document.getElementById("start-date").value = "";
    document.getElementById("end-date").value = "";
    document.getElementById("place").value = "";
    document.getElementById("member").value = "";
    document.getElementById("detail-note").value = "";
    selectedSchedule = null;
  }

  modal.style.display = "block";

  flatpickr("#start-date", { dateFormat: "Y-m-d" });
  flatpickr("#end-date", { dateFormat: "Y-m-d" });
}

function submitDetailSchedule() {
  const title = document.getElementById("detail-title").value;
  const start = document.getElementById("start-date").value;
  const end = document.getElementById("end-date").value;
  const place = document.getElementById("place").value;
  const member = document.getElementById("member").value;
  const note = document.getElementById("detail-note").value;

  if (!title || !start || !end) return alert("모든 항목을 입력하세요.");

  const color = getRandomColor();

  schedules.push({ title, start, end, color, note, place, member });
  closeDetailModal();
  renderCalendar(currentYear, currentMonth);
}

function closeDetailModal() {
  const modal = document.getElementById("detail-schedule-modal");
  modal.style.display = "none";
}

function openViewModal(schedule) {
  selectedSchedule = schedule; // 수정할 대상 저장

  document.getElementById(
    "view-date"
  ).textContent = `${schedule.start} ~ ${schedule.end}`;
  document.getElementById("view-title").textContent = schedule.title;
  document.getElementById("view-place").textContent = schedule.place || "-";
  document.getElementById("view-member").textContent = schedule.member || "-";
  document.getElementById("view-note").textContent =
    schedule.note || "(메모 없음)";
  document.getElementById("view-schedule-modal").style.display = "block";

  // 수정 버튼 연결
  document.getElementById("edit-button").onclick = () => {
    closeViewModal();
    openDetailModal(schedule); // 정보를 넘겨 수정 모달 열기
  };
}

function closeViewModal() {
  document.getElementById("view-schedule-modal").style.display = "none";
}

function updateSchedule() {
  if (!selectedSchedule) return;

  const updatedTitle = document.getElementById("detail-title").value.trim();
  const updatedStart = document.getElementById("start-date").value;
  const updatedEnd = document.getElementById("end-date").value;
  const updatedPlace = document.getElementById("place").value.trim();
  const updatedMember = document.getElementById("member").value.trim();
  const updatedNote = document.getElementById("detail-note").value.trim();

  if (!updatedTitle || !updatedStart || !updatedEnd) {
    alert("제목과 시작일, 종료일을 입력해주세요.");
    return;
  }

  selectedSchedule.title = updatedTitle;
  selectedSchedule.start = updatedStart;
  selectedSchedule.end = updatedEnd;
  selectedSchedule.place = updatedPlace;
  selectedSchedule.member = updatedMember;
  selectedSchedule.note = updatedNote;

  closeDetailModal();
  renderCalendar(currentYear, currentMonth);
}

function closeDetailModal() {
  document.getElementById("detail-schedule-modal").style.display = "none";
}
