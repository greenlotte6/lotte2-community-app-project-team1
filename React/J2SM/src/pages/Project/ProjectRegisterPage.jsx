import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/ProjectRegister.scss";
import { ProjectRegisterMid } from "../../components/Project/ProjectRegisterMid";
import { ProjectRegisterTop } from "../../components/Project/ProjectRegisterTop";
import { ProjectRegisterAside } from "../../components/Project/ProjectRegisterAside";

const ProjectRegisterPage = () => {
  return (
    <div id="ProjectRegisterPage">
      <DashboardLayout>
        <ProjectRegisterAside />
        <div className="contentArea">
          <ProjectRegisterTop />
          <ProjectRegisterMid />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ProjectRegisterPage;
