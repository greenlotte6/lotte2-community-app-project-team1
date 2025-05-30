import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useCates from "../../hooks/useCates";
import { getArticleAll } from "../../api/articleAPI";
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
    // 데이터 요청 함수 정의
    const fetchData = async () => {
      try {
        // 글 목록 요청
        const data = await getArticleAll(pg, cate2);
        console.log(data);

        // 상태 초기화
        setServerData(data);
      } catch (err) {
        console.error(err);
      }
    };

    // 호출
    fetchData();
    //
  }, [pg, cate2]); // 반응 변수(의존성 배열)가 변경되면 다시 useEffect 실행

  return (
    <div id="board">
      <section className="list">
        <nav>
          <form action="#">
            <input
              type="text"
              name="search"
              placeholder="제목 키워드, 글쓴이 검색"
            />
            <input type="submit" value="검색" />
          </form>
        </nav>
        <h1>글목록</h1>
        <table border="0">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>날짜</th>
            <th>조회</th>
          </tr>
          {serverData.dtoList.map((article, index) => (
            <tr key={index}>
              <td>{serverData.startNo - index}</td>
              <td>
                <Link to="/board/view">
                  {article.title}[{article.comment}]
                </Link>
              </td>
              <td>{article.writer}</td>
              <td>{article.rdate}</td>
              <td>{article.hit}</td>
            </tr>
          ))}
        </table>

        <Paging serverData={serverData} cate1={cate1} cate2={cate2} />

        <Link
          to={`/board/write?cate1=${cate1}&cate2=${cate2}`}
          class="btn btnWrite"
        >
          글쓰기
        </Link>
      </section>
    </div>
  );
};

export default List;
