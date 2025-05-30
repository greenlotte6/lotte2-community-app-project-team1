import React from "react";
import { Header } from "../components/admin/Header";
import { Footer } from "../components/admin/Footer";

export const AdminLayout = ({ children }) => {
  return (
    <div id="admin-container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
