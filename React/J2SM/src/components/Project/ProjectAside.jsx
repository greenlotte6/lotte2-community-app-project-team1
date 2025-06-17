import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProjectAside = ({ onNewProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!projectName.trim()) return;
    // register로 projectName 같이 넘기기
    navigate("/dashboard/project/projectRegister", { state: { projectName } });
    // 프로젝트 목록에 추가 (임시, 나중에 register 페이지에서 관리)
    if (onNewProject)
      onNewProject({ name: projectName, status: "in progress" });
    setIsModalOpen(false);
    setProjectName("");
  };

  return (
    <>
      <aside>
        <div className="sidemenu">
          <div className="sideTop">
            <h3>Project</h3>
            <div className="addcl">
              <button type="button" onClick={() => setIsModalOpen(true)}>
                <img src="/images/Plus.svg" alt="plus" />
                <span>New Project</span>
              </button>
            </div>
          </div>
          <div className="childArea">
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <span>진행중인 프로젝트</span>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <span>완료된 프로젝트</span>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
          </div>
        </div>
      </aside>
      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>새 프로젝트 생성</h3>
            <input
              type="text"
              placeholder="프로젝트 이름 입력"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <div className="modalButtons">
              <button className="configbtn" onClick={handleConfirm}>
                세부 설정
              </button>
              <button
                className="cancelbtn"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
