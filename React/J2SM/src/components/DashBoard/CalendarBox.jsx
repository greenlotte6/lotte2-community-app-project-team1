import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const CalendarBox = () => (
  <div className="calendarArea">
    <h3>Calendar</h3>
    <div className="calendarWrapper">
      <Flatpickr options={{ dateFormat: "Y-m-d" }} className="calendarInput" />
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

export default CalendarBox;
