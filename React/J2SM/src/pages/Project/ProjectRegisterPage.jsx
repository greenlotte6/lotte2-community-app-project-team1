import React from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/ProjectRegister.scss";
import { ProjectRegisterMid } from "../../components/Project/ProjectRegisterMid";
import { ProjectRegisterTop } from "../../components/Project/ProjectRegisterTop";
import { ProjectRegisterAside } from "../../components/Project/ProjectRegisterAside";

const ProjectRegisterPage = () => {
  const location = useLocation();
  const projectName = location.state?.projectName || "";
  console.log("넘어온 프로젝트 이름:", projectName);
  console.log("넘어온 프로젝트 이름:", projectName);
  console.log("넘어온 프로젝트 이름:", projectName);

  return (
    <div id="ProjectRegisterPage">
      <DashboardLayout>
        <ProjectRegisterAside />
        <div className="contentArea">
          {/* ✅ 여기서 prop 넘김 */}
          <ProjectRegisterTop projectName={projectName} />
          <ProjectRegisterMid />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ProjectRegisterPage;
