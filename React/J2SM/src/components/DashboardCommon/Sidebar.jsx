import { NavLink } from "react-router-dom";

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

const Sidebar = () => (
  <div className="wrapperside">
    <div className="profileArea">
      <img src="/images/user.png" alt="profile" />
    </div>
    <ul>
      {menuItems.map((item, i) => (
        <li key={i}>
          <NavLink
            to={item.path}
            className={({ isActive }) => (isActive ? "activeMenu" : "")}
          >
            <img src={`/images/${item.icon}`} alt={item.alt} />
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
