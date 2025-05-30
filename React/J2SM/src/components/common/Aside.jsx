import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import useCates from "../../hooks/useCates";

export const Aside = () => {
  const [cate1, cate2] = useCates();

  return (
    <aside>
      <img src={`/images/sub_aside_${cate1}_tit.png`} alt="팜스토리 소개" />
      {/* 팜스토리 소개 */}
      {cate1 == "introduction" && (
        <ul className="lnb">
          <li className={cate2 == "hello" ? "on" : ""}>
            <Link to="/introduction/hello">인사말</Link>
          </li>
          <li className={cate2 == "direction" ? "on" : ""}>
            <Link to="/introduction/direction">찾아오시는길</Link>
          </li>
        </ul>
      )}

      {/* 장보기 */}
      {cate1 == "market" && (
        <ul className="lnb">
          <li className={cate2 == "list" ? "on" : ""}>
            <Link to="/market/list">장보기</Link>
          </li>
        </ul>
      )}

      {/* 농작물이야기 */}
      {cate1 == "croptalk" && (
        <ul className="lnb">
          <li className={cate2 == "story" ? "on" : ""}>
            <Link to="/board/list?cate1=croptalk&cate2=story">
              농작물이야기
            </Link>
          </li>
          <li className={cate2 == "grow" ? "on" : ""}>
            <Link to="/board/list?cate1=croptalk&cate2=grow">텃밭가꾸기</Link>
          </li>
          <li className={cate2 == "school" ? "on" : ""}>
            <Link to="/board/list?cate1=croptalk&cate2=school">귀농학교</Link>
          </li>
        </ul>
      )}

      {/* 이벤트 */}
      {cate1 == "event" && (
        <ul className="lnb">
          <li className={cate2 == "info" ? "on" : ""}>
            <Link to="/board/list?cate1=event&cate2=info">이벤트 정보</Link>
          </li>
        </ul>
      )}

      {/* 커뮤니티 */}
      {cate1 == "community" && (
        <ul className="lnb">
          <li className={cate2 == "notice" ? "on" : ""}>
            <Link to="/board/list?cate1=community&cate2=notice">공지사항</Link>
          </li>
          <li className={cate2 == "menu" ? "on" : ""}>
            <Link to="/board/list?cate1=community&cate2=menu">오늘의식단</Link>
          </li>
          <li className={cate2 == "chef" ? "on" : ""}>
            <Link to="/board/list?cate1=community&cate2=chef">나도요리사</Link>
          </li>
          <li className={cate2 == "qna" ? "on" : ""}>
            <Link to="/board/list?cate1=community&cate2=qna">1:1고객문의</Link>
          </li>
          <li className={cate2 == "faq" ? "on" : ""}>
            <Link to="/board/list?cate1=community&cate2=faq">자주묻는질문</Link>
          </li>
        </ul>
      )}
    </aside>
  );
};
