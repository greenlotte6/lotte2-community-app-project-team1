import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Main } from "../../components/lading/Main";
import CreditList from "../../components/lading/CreditList";

export const MainPage = () => {
  return (
    <MainLayout>
      <Main />
    </MainLayout>
  );
};
