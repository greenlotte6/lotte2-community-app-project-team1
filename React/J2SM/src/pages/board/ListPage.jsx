import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { SubLayout } from "../../layouts/SubLayout";
import List from "../../components/board/List";

const ListPage = () => {
  return (
    <MainLayout>
      <SubLayout>
        <List />
      </SubLayout>
    </MainLayout>
  );
};

export default ListPage;
