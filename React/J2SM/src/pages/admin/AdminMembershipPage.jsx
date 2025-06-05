import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { AdminAside } from "../../components/admin/AdminAside";
import "../../styles/DashBoard/adminMembership.scss";
import { AdminCommonTop } from "../../components/admin/AdminCommonTop";
import { MembershipMid } from "../../components/admin/MembershipMid";

const AdminMembershipPage = () => {
  return (
    <div id="AdminMembership">
      <DashboardLayout>
        <AdminAside />
        <div className="contentArea">
          <AdminCommonTop title={"Membership"} />
          <MembershipMid />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default AdminMembershipPage;
