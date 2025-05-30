import React from "react";
import { Link } from "react-router-dom";

const Paging = ({ serverData }) => {
  //
  const renderingNumbers = () => {
    //
    const numbers = [];
    //
    for (let i = serverData.start; i <= serverData.end; i++) {
      numbers.push(
        <Link
          key={i}
          to={`/market/list?&pg=${i}`}
          className={`num ${serverData.pg == i && "on"}`}
        >
          [{i}]
        </Link>
      );
    }

    return numbers;
  };

  return (
    <div className="paging">
      <a href="#" class="prev">
        이전
      </a>
      {renderingNumbers()}
      <a href="#" class="next">
        다음
      </a>
    </div>
  );
};

export default Paging;
