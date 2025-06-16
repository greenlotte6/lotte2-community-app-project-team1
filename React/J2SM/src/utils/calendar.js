// src/utils/calendar.js

// ─────────────────────────────────────────────────────────────────────────────
// 1) 전역 변수로 사용할 현재 연, 월, 오늘 날짜 객체를 선언
// ─────────────────────────────────────────────────────────────────────────────
let year, month;
const today = new Date();

// ─────────────────────────────────────────────────────────────────────────────
// 2) 캘린더 렌더링 함수
//    - containerId: <div id="calendar-container"> 요소 ID
//    - 이 함수 내부에서 prevMonth, nextMonth도 전역(window)에 바인딩하여
//      React 컴포넌트에서 onClick={() => window.prevMonth()} 식으로 호출 가능
// ─────────────────────────────────────────────────────────────────────────────
export function initCalendar(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 첫 렌더링 시, 오늘 기준 연/월 설정
  year = today.getFullYear();
  month = today.getMonth();

  // 달력 제목과 몸체 요소 얻기
  const titleEl = container.querySelector("#calendar-title");
  const bodyEl = container.querySelector("#calendar-body");

  // ───────────────────────────────────────────────────────────────────────────
  // 내부 함수: 실제로 연·월이 바뀔 때마다 달력을 다시 그리는 로직
  // ───────────────────────────────────────────────────────────────────────────
  function renderCalendar() {
    // ① 헤더에 “YYYY년 MM월” 표시
    if (titleEl) {
      titleEl.textContent = `${year}년 ${month + 1}월`;
    }

    // ② 이번 달 1일의 요일과 말일(마지막 날짜) 계산
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0=일요일, ... 6=토요일
    const lastDate = new Date(year, month + 1, 0).getDate(); // 말일(해당 월의 마지막 날짜)
    const prevLastDate = new Date(year, month, 0).getDate(); // 이전 달 마지막 날짜

    // ③ 날짜 배열 생성 (지난달 뒤쪽 날짜, 이번달 날짜, 다음달 앞쪽 날짜)
    const days = [];

    // (1) 지난달 뒤쪽 날짜
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push(`<td className="inactive">${prevLastDate - i}</td>`);
    }

    // (2) 이번달 날짜
    for (let i = 1; i <= lastDate; i++) {
      // 오늘이 속한 칸에만 “today” 클래스 추가
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();
      // 날짜 클릭하면, openScheduleModalWithDate(...) 라는 함수 호출하도록 변경
      days.push(
        `<td className="${
          isToday ? "today" : ""
        }" onclick="openScheduleModalWithDate('${year}-${String(
          month + 1
        ).padStart(2, "0")}-${String(i).padStart(2, "0")}')">${i}</td>`
      );
    }

    // (3) 다음달 앞쪽 날짜
    const nextDaysCount = 42 - days.length; // 6행×7열 = 총 42칸
    for (let i = 1; i <= nextDaysCount; i++) {
      days.push(`<td className="inactive">${i}</td>`);
    }

    // ④ <tbody id="calendar-body">를 비우고, 새로 6개의 <tr>에 7개씩 <td>를 채움
    if (bodyEl) {
      bodyEl.innerHTML = "";
      for (let row = 0; row < 6; row++) {
        const tr = document.createElement("tr");
        for (let col = 0; col < 7; col++) {
          const idx = row * 7 + col;
          tr.innerHTML += days[idx];
        }
        bodyEl.appendChild(tr);
      }
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 3) prevMonth(), nextMonth()를 전역 함수(window에 바인딩)
  //    React 컴포넌트에서 onClick={() => window.prevMonth()}으로 호출
  // ───────────────────────────────────────────────────────────────────────────
  window.prevMonth = () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    renderCalendar();
  };
  window.nextMonth = () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    renderCalendar();
  };

  // ───────────────────────────────────────────────────────────────────────────
  // 4) 최초 렌더링 호출
  // ───────────────────────────────────────────────────────────────────────────
  renderCalendar();
}

// ─────────────────────────────────────────────────────────────────────────────
// 5) "날짜 문자열"을 받아서 간편 일정 모달을 열어주는 헬퍼 함수 추가
//    React 쪽에서는 렌더된 <td onclick="openScheduleModalWithDate('2025-06-15')"> 형태로 호출됨
// ─────────────────────────────────────────────────────────────────────────────
export function openScheduleModalWithDate(dateStr) {
  // hidden input#modal-date 에 날짜를 세팅
  const hiddenDate = document.getElementById("modal-date");
  if (hiddenDate) hiddenDate.value = dateStr;

  // 열린다
  const modal = document.getElementById("schedule-modal");
  if (modal) modal.style.display = "flex";
}

// ─────────────────────────────────────────────────────────────────────────────
// 6) 간편 일정 등록 모달 닫기 / 저장
// ─────────────────────────────────────────────────────────────────────────────
export function closeScheduleModal() {
  const modal = document.getElementById("schedule-modal");
  if (modal) modal.style.display = "none";
}
export function saveSchedule() {
  const titleInput = document.getElementById("modal-title");
  const dateInput = document.getElementById("modal-date");
  const title = titleInput?.value || "제목 없음";
  const date = dateInput?.value || "날짜 없음";
  alert(`간편일정 저장\n${date} → ${title}`);
  closeScheduleModal();
}

// ─────────────────────────────────────────────────────────────────────────────
// 7) 세부 일정 모달 열기/닫기
// ─────────────────────────────────────────────────────────────────────────────
export function openDetailModal() {
  const modal = document.getElementById("detail-schedule-modal");
  if (modal) modal.style.display = "flex";
}
export function closeDetailModal() {
  const modal = document.getElementById("detail-schedule-modal");
  if (modal) modal.style.display = "none";
}

// ─────────────────────────────────────────────────────────────────────────────
// 8) 세부 일정 저장
// ─────────────────────────────────────────────────────────────────────────────
export function submitDetailSchedule() {
  const title = document.getElementById("detail-title")?.value || "제목 없음";
  const start = document.getElementById("start-date")?.value || "없음";
  const end = document.getElementById("end-date")?.value || "없음";
  const place = document.getElementById("place")?.value || "없음";
  const member = document.getElementById("member")?.value || "없음";
  const note = document.getElementById("detail-note")?.value || "없음";
  alert(
    `세부일정 저장\n제목: ${title}\n시작: ${start}\n종료: ${end}\n장소: ${place}\n참석: ${member}\n메모: ${note}`
  );
  closeDetailModal();
}

// ─────────────────────────────────────────────────────────────────────────────
// 9) 일정 보기 모달 열기/닫기
// ─────────────────────────────────────────────────────────────────────────────
export function openViewModal() {
  const modal = document.getElementById("view-schedule-modal");
  if (modal) modal.style.display = "flex";
}
export function closeViewModal() {
  const modal = document.getElementById("view-schedule-modal");
  if (modal) modal.style.display = "none";
}

// ─────────────────────────────────────────────────────────────────────────────
// 아래에 export한 함수들을 window 객체에도 바인딩해서 “전역 함수”로 노출
// ─────────────────────────────────────────────────────────────────────────────
window.openScheduleModalWithDate = openScheduleModalWithDate;
window.closeScheduleModal = closeScheduleModal;
window.saveSchedule = saveSchedule;
window.openDetailModal = openDetailModal;
window.closeDetailModal = closeDetailModal;
window.submitDetailSchedule = submitDetailSchedule;
window.openViewModal = openViewModal;
window.closeViewModal = closeViewModal;
