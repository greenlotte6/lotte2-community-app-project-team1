import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { USER_THUMB } from "../../api/_http";
import axios from "axios";
import { getInfo } from "../../api/userAPI";

const TopArea = () => {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState("--:--:--");
  const [statusMessage, setStatusMessage] = useState("");
  const { username } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 유저 정보 들고오기

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getInfo(); // ✅ 여기를 직접 호출
      setUser(data);
      console.log("📦 유저 데이터:", data);
    };

    fetchUser();
  }, [username]);

  const handleCheckIn = () => {
    setStatusMessage(`출근 완료 (${new Date().toLocaleTimeString()})`);
  };

  const handleCheckOut = () => {
    setStatusMessage(`퇴근 완료 (${new Date().toLocaleTimeString()})`);
  };

  return (
    <div className="topArea">
      <div className="mainProfile">
        <h3>Personal Details</h3>
        <div className="infoArea">
          <div className="photoBox">
            <img
              src={`${USER_THUMB}/${user?.profileImage}`}
              className="photoPlaceholder"
              alt="사진"
            />

            <button className="verifyBtn">Verification Photo</button>
          </div>
          <ul className="detailList">
            <li>
              <strong>Name:</strong> {user?.name}
            </li>
            <li>
              <strong>Position:</strong> {user?.position}
            </li>
            <li>
              <div className="attendanceArea">
                <div className="currentTime">{currentTime}</div>
                <div className="btnGroup">
                  <button className="workBtn" onClick={handleCheckIn}>
                    출근
                  </button>
                  <button className="workBtn" onClick={handleCheckOut}>
                    퇴근
                  </button>
                </div>
                <div className="statusMessage">{statusMessage}</div>
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
};

export default TopArea;
