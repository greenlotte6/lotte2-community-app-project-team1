import VisitPageCard from "./VisitPageCard";

const MidArea = () => (
  <div className="midArea">
    <div className="recentArea">
      <div className="titleArea">
        <h3>Recent Visits</h3>
      </div>
      <div className="visitSlider">
        <div className="visitArea">
          {Array.from({ length: 15 }).map((_, i) => (
            <VisitPageCard key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default MidArea;
