import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/dashboardMain.scss";
import { AdminAside } from "../../components/admin/AdminAside";
import { AdminTopArea } from "../../components/admin/AdminTopArea";
import { AdminMidArea } from "../../components/admin/AdminMidArea";
import { AdminBotArea } from "../../components/admin/AdminBotArea";
import "../../styles/DashBoard/adminMain.scss";

const AdminMainPage = () => {
  return (
    <div id="AdminMain">
      <DashboardLayout>
        <AdminAside />
        <div className="contentArea">
          <AdminTopArea />
          <AdminMidArea />
          <AdminBotArea />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default AdminMainPage;
