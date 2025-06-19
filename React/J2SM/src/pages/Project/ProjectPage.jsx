import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/Project.scss";
import { ProjectAside } from "../../components/Project/ProjectAside";
import { ProjectMid } from "../../components/Project/ProjectMid";
import { AdminCommonTop } from "../../components/admin/AdminCommonTop";
import {
  fetchMyProjects,
  createProject,
  deleteProject,
} from "@/api/projectAPI";
import useAuth from "../../hooks/useAuth";

const ProjectPage = () => {
  const [userGroups, setUserGroups] = useState([]);
  const { username, company } = useAuth();
  const userId = username;
  const [projects, setProjects] = useState([]);

  // 최초 렌더링 시 내 프로젝트 불러오기
  useEffect(() => {
    fetchMyProjects(userId).then(setProjects);
  }, []);

  // 프로젝트 삭제 → 서버/로컬 상태 갱신
  const handleRemoveProject = async (id) => {
    await deleteProject(id);
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  // 프로젝트 생성 → 서버에 등록 후 로컬 상태 갱신
  const handleAddProject = async (newProject) => {
    // newProject: { name, status }
    const res = await createProject({
      name: newProject.name,
      createdBy: userId,
      description: "", // 필요시 추가
    });
    setProjects((prev) => [...prev, res]);
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
