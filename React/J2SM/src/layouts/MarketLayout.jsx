import React from "react";
import { Aside } from "../components/common/Aside";
import { useLocation, useSearchParams } from "react-router-dom";
import useCates from "../hooks/useCates";

import labels from "../data/labels.json";

export const MarketLayout = ({ children }) => {
  const [cate1, cate2] = useCates();

  return (
    <div id="sub">
      <div>
        <img src={`/images/sub_top_${cate1}.png`} alt={`${cate1}`} />
      </div>
      <section className={`${cate1}`}>
        <Aside />
        <article className="list">
          <nav>
            <img
              src={`/images/sub_nav_tit_${cate1}_${cate2}.png`}
              alt={`${cate1}`}
            />
            <p>
              HOME &gt; {labels[cate1]} &gt; <em>{labels[cate2]}</em>
            </p>
          </nav>
          {/* 내용 시작 */}
          {children}
          {/* 내용 끝 */}
        </article>
      </section>
    </div>
  );
};
