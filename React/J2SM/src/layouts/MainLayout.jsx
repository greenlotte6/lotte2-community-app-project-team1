import React from "react";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";


export const MainLayout = ({ children }) => {
  return (
    <div id="container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
