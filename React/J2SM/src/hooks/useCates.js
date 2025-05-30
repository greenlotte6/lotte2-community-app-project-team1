import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

// cate1, cate2를 구하는 커스텀 훅
export const useCates = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const pathValues = location.pathname.split("/");

  let cate1 = pathValues[1];
  let cate2 = pathValues[2];

  if (cate1 == "board") {
    cate1 = searchParams.get("cate1");
    cate2 = searchParams.get("cate2");
  }

  return [cate1, cate2];
};

export default useCates;
