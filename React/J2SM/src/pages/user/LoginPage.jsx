import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Login } from "../../components/user/Login";

export const LoginPage = () => {
  return (
    <MainLayout>
      <div id="user">
        <Login />
      </div>
    </MainLayout>
  );
};
