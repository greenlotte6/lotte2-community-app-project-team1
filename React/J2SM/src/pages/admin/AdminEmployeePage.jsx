import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { AdminAside } from "../../components/admin/AdminAside";
import { AdminCommonTop } from "../../components/admin/AdminCommonTop";
import { EmployeeMid } from "../../components/admin/EmployeeMid";
import "../../styles/DashBoard/adminEmploy.scss";

const AdminEmployeePage = () => {
  return (
    <div id="AdminEmployee">
      <DashboardLayout>
        <AdminAside />
        <div className="contentArea">
          <AdminCommonTop title={"Employee Management"} />
          <EmployeeMid />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default AdminEmployeePage;
