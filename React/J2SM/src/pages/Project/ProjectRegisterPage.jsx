import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { ProjectRegisterAside } from "../../components/Project/ProjectRegisterAside";
import { ProjectRegisterTop } from "../../components/Project/ProjectRegisterTop";
import { ProjectRegisterMid } from "../../components/Project/ProjectRegisterMid";
import {
  fetchProjectDetail,
  updateProject,
  saveSectionsBulk,
} from "@/api/projectAPI";
import "../../styles/DashBoard/ProjectRegister.scss";

const ProjectRegisterPage = () => {
  const location = useLocation();
  const {
    projectName: initialName,
    projectId,
    mode = "create",
  } = location.state || {};
  const [name, setName] = useState(initialName || "");
  const [description, setDescription] = useState("");
  const [areas, setAreas] = useState([]); // ✅ 섹션+태스크 구조
  const [loading, setLoading] = useState(false);

  // 수정모드라면 정보 불러오기
  useEffect(() => {
    if (mode === "edit" && projectId) {
      setLoading(true);
      fetchProjectDetail(projectId)
        .then((data) => {
          setName(data.name || "");
          setDescription(data.description || "");
        })
        .finally(() => setLoading(false));
    }
  }, [mode, projectId]);

  // 저장
  // 저장
  const handleSave = async () => {
    if (!name.trim()) return alert("프로젝트명을 입력하세요!");

    if (mode === "edit" && projectId) {
      await updateProject(projectId, { name, description });
      // ✅ 섹션+태스크 bulk 저장
      await saveSectionsBulk(projectId, areas);
      alert("저장 완료!");
    } else {
      alert("프로젝트가 생성되었습니다!");
    }
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div id="ProjectRegisterPage">
      <DashboardLayout>
        <ProjectRegisterAside />
        <div className="contentArea">
          <ProjectRegisterTop
            title={name}
            setTitle={setName}
            description={description}
            setDescription={setDescription}
            mode={mode}
            onSave={handleSave}
          />
          <ProjectRegisterMid
            mode={mode}
            projectId={projectId}
            areas={areas} // ⬅️ props로 전달
            setAreas={setAreas} // ⬅️ props로 전달
          />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ProjectRegisterPage;
