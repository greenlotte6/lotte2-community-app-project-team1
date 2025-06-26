import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { USER_THUMB } from "../../api/_http";
import axios from "axios";
import { getInfo, postUserLogin } from "../../api/userAPI";

const initState = {
  uid: "",
  pass: "",
};

const TopArea = () => {
  const [user, setUser] = useState(null);
  const [loginUser, setLoginUser] = useState(null);

  const [currentTime, setCurrentTime] = useState("--:--:--");
  const [statusMessage, setStatusMessage] = useState("");
  const { username, nick, company } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 유저 정보 들고오기

  // 소셜 로그인 토큰

  const { login } = useAuth();

  useEffect(() => {
    if (nick !== null && username !== null && company !== null) return;

    axios
      .get("https://api.j2sm.site/api/user/me", {
        withCredentials: true,
      })
      .then(async (res) => {
        console.log("소셜 인증됨 ", res.data);
        const data = res.data;

        // 👉 userDTO 구조에 맞게 로그인 시도
        const loginDTO = {
          uid: data.uid,
          pass: "SOCIAL_LOGIN", // 비밀번호는 소셜 로그인 시 의미 없음 (임의값)
        };

        try {
          const result = await postUserLogin(loginDTO);
          console.log("postUserLogin 결과:", result);

          if (result.username) {
            login(
              result.username,
              decodeURIComponent(result.department),
              decodeURIComponent(result.company),
              result.nick,
              result.membership
            );
          }
        } catch (err) {
          console.error("소셜 로그인 후 postUserLogin 실패:", err);
        }
      })
      .catch((err) => {
        console.error("소셜 인증 실패 또는 쿠키 없음", err);
      });
  }, []);

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
