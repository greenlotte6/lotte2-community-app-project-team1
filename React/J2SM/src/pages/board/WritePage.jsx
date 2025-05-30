import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { SubLayout } from "../../layouts/SubLayout";
import Write from "../../components/board/Write";

const WritePage = () => {
  return (
    <MainLayout>
      <SubLayout>
        <Write />
      </SubLayout>
    </MainLayout>
  );
};

export default WritePage;
