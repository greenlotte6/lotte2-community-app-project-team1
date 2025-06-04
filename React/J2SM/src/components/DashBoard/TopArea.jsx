const TopArea = () => (
  <div className="topArea">
    <div className="mainProfile">
      <h3>Personal Details</h3>
      <div className="infoArea">
        <div className="photoBox">
          <div className="photoPlaceholder" />
          <button className="verifyBtn">Verification Photo</button>
        </div>
        <ul className="detailList">
          <li>
            <strong>Name:</strong> 정상수
          </li>
          <li>
            <strong>Position:</strong> Manager
          </li>
          <li>
            <div className="attendanceArea">
              <div className="currentTime">--:--:--</div>
              <div className="btnGroup">
                <button className="workBtn">출근</button>
                <button className="workBtn">퇴근</button>
              </div>
              <div className="statusMessage" />
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div className="scheduleArea">
      <h3>Schedule</h3>
      <div className="scheduleinfo">
        <table className="scheduleTable">
          <tbody>
            {[1, 2, 3, 4].map((_, i) => (
              <tr key={i}>
                <td>
                  오늘
                  <br />
                  5월 27일
                </td>
                <td>
                  오전 9시 사무실
                  <br />
                  <strong>짧은 팀 회의</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default TopArea;
