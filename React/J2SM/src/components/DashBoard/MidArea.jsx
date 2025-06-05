import { useEffect, useRef } from "react";
import VisitPageCard from "./VisitPageCard";

const MidArea = () => {
  const visitAreaRef = useRef(null);

  useEffect(() => {
    const area = visitAreaRef.current;
    const onWheel = (e) => {
      e.preventDefault();
      area.scrollLeft += e.deltaY;
    };

    if (area) {
      area.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
      area?.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="midArea">
      <div className="recentArea">
        <div className="titleArea">
          <h3>Recent Visits</h3>
        </div>
        <div className="visitSlider">
          <div className="visitArea" ref={visitAreaRef}>
            {Array.from({ length: 15 }).map((_, i) => (
              <VisitPageCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidArea;
