import React from "react";

export const ProjectMid = ({ projects = [], onRemoveProject }) => {
  return (
    <div className="midArea">
      {projects.length === 0 ? (
        <div className="projectcontent empty">
          <span>등록된 프로젝트가 없습니다.</span>
        </div>
      ) : (
        projects.map((project) => (
          <div className="projectcontent" key={project.id}>
            <img src="/images/Layers.svg" alt="layericon" />
            <div className="contenttext">
              <span>{project.name}</span>
              <br />
              <p>{project.status ?? "in progress"}</p>
            </div>
            <button onClick={() => onRemoveProject?.(project.id)}>
              <img src="/images/Trash 2.svg" alt="trash" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};
