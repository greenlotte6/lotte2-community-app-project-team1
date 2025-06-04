import React from "react";
import Sidebar from "../components/DashBoard/Sidebar";
import Header from "../components/DashBoard/Header";

export const DashboardLayout = ({ children }) => {
  return (
    <div id="DashboardMainLayout">
      <Sidebar />
      <div className="layout-container">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};
