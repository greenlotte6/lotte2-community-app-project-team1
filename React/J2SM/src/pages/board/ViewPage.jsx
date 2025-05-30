import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { SubLayout } from "../../layouts/SubLayout";
import View from "../../components/board/View";

const ViewPage = () => {
  return (
    <MainLayout>
      <SubLayout>
        <View />
      </SubLayout>
    </MainLayout>
  );
};

export default ViewPage;
