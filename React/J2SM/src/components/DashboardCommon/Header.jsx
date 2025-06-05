const Header = ({ isDarkMode, onToggleDarkMode }) => (
  <header>
    <div className="headerArea">
      <div className="headerlogo">
        <a href="#">
          <img src="/images/logo.png" alt="Logo" />
        </a>
      </div>
      <div className="darkmode">
        <label className="toggle-switch">
          <span className="label-text">DARK MODE</span>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={onToggleDarkMode}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div className="alert">
        <img src="/images/bell.png" alt="bell" />
      </div>
    </div>
  </header>
);
export default Header;
