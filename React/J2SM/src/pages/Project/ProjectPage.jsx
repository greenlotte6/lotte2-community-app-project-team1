import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/Project.scss";
import { ProjectAside } from "../../components/Project/ProjectAside";
import { ProjectMid } from "../../components/Project/ProjectMid";
import { AdminCommonTop } from "../../components/admin/AdminCommonTop";

const ProjectPage = () => {
  return (
    <div id="ProjectPage">
      <DashboardLayout>
        <ProjectAside />
        <div className="contentArea">
          <AdminCommonTop title={"My Project"} />
          <ProjectMid />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ProjectPage;
