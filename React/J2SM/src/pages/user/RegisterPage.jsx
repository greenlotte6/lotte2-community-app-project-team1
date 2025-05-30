import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Register } from "../../components/user/Register";

export const RegisterPage = () => {
  return (
    <MainLayout>
      <div id="user">
        <Register />
      </div>
    </MainLayout>
  );
};
