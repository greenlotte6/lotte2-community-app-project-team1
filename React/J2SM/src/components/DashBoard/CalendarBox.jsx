import React, { useRef, useEffect } from "react";
import flatpickr from "flatpickr";
import { Korean } from "flatpickr/dist/l10n/ko";

const CalendarBox = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    flatpickr(calendarRef.current, {
      inline: true,
      locale: Korean,
      dateFormat: "Y-m-d",
    });
  }, []);

  return (
    <div className="calendarArea">
      <h3>Calendar</h3>
      <div className="calendarWrapper">
        {/* ✅ 여기 span으로 실제 flatpickr DOM 붙일 부분 */}
        <span ref={calendarRef} className="calendarInput" />
        <div className="scheduleInfoBox">
          <p>
            <strong>6월 2일</strong>
          </p>
          <ul>
            <li>10:00 회의</li>
            <li>14:00 코드리뷰</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarBox;
