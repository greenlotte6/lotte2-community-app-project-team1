import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Terms } from "../../components/user/Terms";

export const TermsPage = () => {
  return (
    <MainLayout>
      <div id="user">
        <Terms />
      </div>
    </MainLayout>
  );
};
