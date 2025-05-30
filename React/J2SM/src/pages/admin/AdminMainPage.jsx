import React from "react";
import { Header } from "../../components/admin/Header";
import { Footer } from "../../components/admin/Footer";
import { Main } from "../../components/admin/Main";
import { AdminLayout } from "../../layouts/AdminLayout";

export const AdminMainPage = () => {
  return (
    <AdminLayout>
      <Main />
    </AdminLayout>
  );
};
