import React from "react";
import { Link } from "react-router-dom";

const Paging = ({ serverData, cate1, cate2 }) => {
  //
  const renderingNumbers = () => {
    //
    const numbers = [];
    //
    for (let i = serverData.start; i <= serverData.end; i++) {
      numbers.push(
        <Link
          key={i}
          to={`/board/list?cate1=${cate1}&cate2=${cate2}&pg=${i}`}
          className={`num ${serverData.pg == i && "current"}`}
        >
          {i}
        </Link>
      );
    }

    return numbers;
  };

  return (
    <div class="page">
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
