import React, { useEffect, useState } from "react";
import Sidebar from "../components/DashboardCommon/Sidebar";
import Header from "../components/DashboardCommon/Header";

export const DashboardLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document
      .querySelector(".container")
      ?.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <div id="DashboardMainLayout">
      <div className="wrapper">
        <Sidebar />
        <div className="container">
          <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};
