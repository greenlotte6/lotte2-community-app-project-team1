import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { CALENDAR_TODAY } from "../../api/_http";

const menuItems = [
  { path: "/dashboard/main", icon: "Grid.svg", alt: "dashboard" },
  { path: "/dashboard/mypage/mypage", icon: "File text.svg", alt: "document" },
  { path: "/dashboard/board/main", icon: "Clipboard.svg", alt: "board" },
  { path: "/dashboard/calendar", icon: "Calendar.svg", alt: "calendar" },
  { path: "/dashboard/chatting/main", icon: "Message square.svg", alt: "chat" },
  {
    path: "/dashboard/project/project",
    icon: "gmail_groups.svg",
    alt: "project",
  },
  { path: "/dashboard/drive", icon: "Cloud.svg", alt: "cloud" },
  { path: "/dashboard/setting", icon: "Settings.svg", alt: "setting" },
];

const Sidebar = () => {
  const { username } = useAuth();
  const [calendarAlert, setCalendarAlert] = useState(false);

  useEffect(() => {
    const fetchCalendarBadge = async () => {
      try {
        const res = await fetch(CALENDAR_TODAY, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("캘린더 호출 실패");

        const data = await res.json(); // ← Boolean true or false
        console.log("오늘 일정 여부:", data);

        setCalendarAlert(data); // ← 바로 반영
      } catch (err) {
        console.error("캘린더 뱃지 에러:", err);
      }
    };

    fetchCalendarBadge();
  }, [username]);

  return (
    <div className="wrapperside">
      <div className="profileArea">
        <img src="/images/user.png" alt="profile" />
      </div>
      <ul>
        {menuItems.map((item, i) => (
          <li key={i} style={{ position: "relative" }}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "activeMenu" : "")}
            >
              <img src={`/images/${item.icon}`} alt={item.alt} />
              {item.alt === "calendar" && calendarAlert && (
                <img
                  src="/images/alert.png"
                  alt="badge"
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "4px",
                    width: "25px",
                    height: "25px",
                    zIndex: 10,
                  }}
                />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
