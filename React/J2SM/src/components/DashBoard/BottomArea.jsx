import CalendarBox from "./CalendarBox";
import ProjectCard from "./ProjectCard";

const BottomArea = () => (
  <div className="bottomArea">
    <div className="projectArea">
      <h3>Project</h3>
      <div className="projectList">
        <ul>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCard key={i} />
          ))}
        </ul>
      </div>
    </div>
    <CalendarBox />
  </div>
);

export default BottomArea;
