import React, { useEffect, useState } from "react";
import Sorting from "./Sorting";
import ListItem from "./ListItem";
import useCates from "../../hooks/useCates";
import { useSearchParams } from "react-router-dom";
import { getProductAll } from "../../api/productAPI";
import Paging from "./Paging";

const initState = {
  dtoList: [],
  cate: null,
  pg: 0,
  size: 0,
  total: 0,
  startNo: 0,
  start: 0,
  end: 0,
  prev: false,
  next: false,
};

const List = () => {
  const [cate1, cate2] = useCates();

  const [serverData, setServerData] = useState(initState);

  const [queryParams] = useSearchParams();
  const pg = queryParams.get("pg") || 1;

  useEffect(() => {
    // 서버 상품 데이터 요청
    const fetchData = async () => {
      try {
        const data = await getProductAll(pg);
        console.log(data);

        // 상태 초기화
        setServerData(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [pg]);

  return (
    <>
      <Sorting />

      <table border="0">
        <thead>
          <tr>
            <th>이미지</th>
            <th>종류</th>
            <th>상품명</th>
            <th>할인</th>
            <th>포인트</th>
            <th>판매가격</th>
          </tr>
        </thead>
        <tbody>
          {serverData.dtoList.map((product, index) => (
            <ListItem key={index} product={product} />
          ))}
        </tbody>
      </table>

      <Paging serverData={serverData} />
    </>
  );
};

export default List;
