const menuItems = [
  { path: "/dashboard", icon: "Grid.svg", alt: "dashboard" },
  { path: "/mypage", icon: "File text.svg", alt: "document" },
  { path: "/calendar", icon: "Calendar.svg", alt: "calendar" },
  { path: "/chat", icon: "Message square.svg", alt: "chat" },
  { path: "/board", icon: "Clipboard.svg", alt: "board" },
  { path: "/project", icon: "gmail_groups.svg", alt: "project" },
  { path: "/cloud", icon: "Cloud.svg", alt: "cloud" },
  { path: "/setting", icon: "Settings.svg", alt: "setting" },
];

const Sidebar = () => (
  <div className="wrapperside">
    <div className="profileArea">
      <img src="/images/user.png" alt="profile" />
    </div>
    <ul>
      {menuItems.map((item, i) => (
        <li key={i}>
          <a href={item.path}>
            <img src={`/images/${item.icon}`} alt={item.alt} />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
