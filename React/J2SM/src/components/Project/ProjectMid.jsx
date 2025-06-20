import { useNavigate } from "react-router-dom";

export const ProjectMid = ({ projects = [], onRemoveProject }) => {
  const navigate = useNavigate();

  return (
    <div className="midArea">
      {projects.length === 0 ? (
        <div className="projectcontent empty">
          <span>등록된 프로젝트가 없습니다.</span>
        </div>
      ) : (
        projects.map((project) => (
          <div
            className="projectcontent"
            key={project.id}
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate("/dashboard/project/projectRegister", {
                state: {
                  projectId: project.id,
                  projectName: project.name,
                  mode: "edit",
                },
              })
            }
          >
            <img src="/images/Layers.svg" alt="layericon" />
            <div className="contenttext">
              <span>{project.name}</span>
              <br />
              <p>{project.status ?? "in progress"}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveProject?.(project.id);
              }}
            >
              <img src="/images/Trash 2.svg" alt="trash" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};
