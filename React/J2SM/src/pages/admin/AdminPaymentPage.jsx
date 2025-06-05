import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { AdminAside } from "../../components/admin/AdminAside";
import "../../styles/DashBoard/adminCredit.scss";
import { AdminCommonTop } from "../../components/admin/AdminCommonTop";
import { PaymentMid } from "../../components/admin/PaymentMid";

const AdminMembershipPage = () => {
  return (
    <div id="AdminPayment">
      <DashboardLayout>
        <AdminAside />
        <div className="contentArea">
          <AdminCommonTop title={"Payment deatails"} />
          <PaymentMid />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default AdminMembershipPage;
