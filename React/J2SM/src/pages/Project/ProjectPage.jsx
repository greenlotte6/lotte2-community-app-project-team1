import React, { useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/Project.scss";
import { ProjectAside } from "../../components/Project/ProjectAside";
import { ProjectMid } from "../../components/Project/ProjectMid";
import { AdminCommonTop } from "../../components/admin/AdminCommonTop";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);

  // 삭제 함수는 동일
  const handleRemoveProject = (id) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  // 🟢 추가 함수 여기 넘기기!
  const handleAddProject = (newProject) => {
    setProjects((prev) => [
      ...prev,
      { ...newProject, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
  };

  return (
    <div id="ProjectPage">
      <DashboardLayout>
        <ProjectAside onNewProject={handleAddProject} />
        <div className="contentArea">
          <AdminCommonTop title={"My Project"} />
          <ProjectMid
            projects={projects}
            onRemoveProject={handleRemoveProject}
          />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ProjectPage;
