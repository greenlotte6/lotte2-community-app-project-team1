import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { SubLayout } from "../../layouts/SubLayout";
import Modify from "../../components/board/Modify";

const ModifyPage = () => {
  return (
    <MainLayout>
      <SubLayout>
        <Modify />
      </SubLayout>
    </MainLayout>
  );
};

export default ModifyPage;
