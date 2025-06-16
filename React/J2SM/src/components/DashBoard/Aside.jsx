// src/components/Aside.jsx

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import BoardModal from "../board/BoardModal"; // 모달 컴포넌트 임포트
import AsideChat from "./aside/AsideChat";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { CATEGORY_LIST } from "../../api/_http";

const Aside = () => {
  const location = useLocation();
  const { pathname } = location;
  const { username, company, role } = useAuth(); // 로그인 정보
  const isAdmin = role === "ADMIN";

  const [categories, setCategories] = useState([]);
  const [isBoardModalOpen, setBoardModalOpen] = useState(false);

  // 모달 열고 닫기
  const handleBoardModalOpen = () => setBoardModalOpen(true);
  const handleBoardModalClose = () => setBoardModalOpen(false);

  // ✅ 회사 ID 파싱 (예: "1:그린컴퓨터아카데미" → 1)
  const cno = company?.split?.(":")?.[0] ?? null;
  console.log("컴퍼니 : " + cno);

  // ✅ 카테고리 불러오기
  const fetchCategories = async () => {
    if (!cno) return;
    try {
      const res = await axios.get(CATEGORY_LIST(cno));
      setCategories(res.data);
    } catch (err) {
      console.error("카테고리 목록 불러오기 실패", err);
    }
  };

  // ✅ 최초 로딩 시 실행
  useEffect(() => {
    if (pathname.includes("/dashboard/board")) {
      fetchCategories();
    }
  }, [pathname, cno]);

  // ✅ 게시판 생성
  const handleBoardCreate = async (boardName) => {
    if (!cno) return alert("회사 정보가 없습니다.");
    try {
      await axios.post(CATEGORY_LIST(cno), {
        name: boardName,
        description: "",
      });
      await fetchCategories();
      setBoardModalOpen(false);
    } catch (err) {
      console.error("게시판 생성 실패", err);
      alert("게시판 생성 실패");
    }
  };

  // '/dashboard/calendar' 경로일 때
  if (pathname.includes("/dashboard/calendar")) {
    // 이 안에 로직 설정
    return (
      <aside>
        <div className="sidemenu">
          <div className="sideTop">
            <h3>Calendar</h3>
          </div>
          <div className="childArea">
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <Link to="/dashboard/calendar">My Calendar</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <div className="menuItem">
              <img src="/images/File text.svg" alt="users" />
              <Link to="/dashboard/calendar/public">Public Calendar</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // '/dashboard/board' 경로일 때

  if (pathname.includes("/dashboard/board")) {
    return (
      <>
        <aside>
          <div className="sidemenu">
            <div className="sideTop">
              <h3>B board</h3>
            </div>
            <div className="childArea">
              <div className="menuItem">
                <img src="/images/File text.svg" alt="users" />
                <Link to="/dashboard/board/main">HOME</Link>
                <img src="/images/Vector.svg" alt="vector" />
              </div>
              <ul className="subMenu">
                <li>
                  <Link to="#">더미더미더미</Link>
                </li>
                <li>
                  <Link to="#">더미더미더미</Link>
                </li>
              </ul>

              <div className="side-icon">
                <button className="side-click" onClick={handleBoardModalOpen}>
                  + New BOARD
                </button>
              </div>

              <div className="menuItem">
                <img src="/images/File text.svg" alt="users" />
                <Link to="/dashboard/board/list">🔒공지사항</Link>
                <img src="/images/Vector.svg" alt="vector" />
              </div>
              {categories.map((cat) => (
                <div className="menuItem" key={cat.id}>
                  <img src="/images/File text.svg" alt="board" />
                  <Link to={`/dashboard/board/category/${cat.id}`}>
                    {cat.name}
                  </Link>
                  <img src="/images/Vector.svg" alt="vector" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        <BoardModal
          isOpen={isBoardModalOpen}
          onClose={handleBoardModalClose}
          onCreate={handleBoardCreate}
        />
      </>
    );
  }

  // '/dashboard/drive' 경로일 때
  if (pathname.includes("/dashboard/drive")) {
    return (
      <aside>
        <div className="sidemenu">
          <div className="sideTop">Cloud</div>
          <div>
            <button id="sidebar-new-button">+ 신규</button>
          </div>
          <div className="childArea">
            <div>
              <img src="/images/Cloudhome.png.png" alt="홈" />
              <Link to="/dashboard/drive">홈</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <div>
              <img src="/images/Mydrive.png" alt="내 드라이브" />
              <Link to="/dashboard/drive">내 드라이브</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <div>
              <img src="/images/Sharedrive.png" alt="공유 드라이브" />
              <Link to="/dashboard/drive">공유 드라이브</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <div>
              <img src="/images/Recent Drive.png" alt="최근 드라이브" />
              <Link to="/dashboard/drive/recent">최근 드라이브</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <div>
              <img src="/images/Critical drive.png" alt="중요 드라이브" />
              <Link to="/dashboard/drive">중요 드라이브</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
            <div>
              <img src="/images/Wastebasket.png" alt="휴지통" />
              <Link to="/dashboard/drive/delete">휴지통</Link>
              <img src="/images/Vector.svg" alt="vector" />
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <div className="childArea">
              <div>
                <img src="/images/cloud-computing.png" alt="저장용량" />
                <Link to="/dashboard/drive/storage">저장용량</Link>
                <img src="/images/Vector.svg" alt="vector" />
              </div>
            </div>
            <div className="storage">
              <p>4.7GB / 15GB</p>
              <div className="storage-bar">
                <div className="used" style={{ width: "100%" }}></div>
              </div>
              <button className="buy-btn">저장용량 구매</button>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // 기본 사이드바
  // '/dashboard/chatting' 경로일 때 렌더링할 사이드바 내용
  if (pathname.includes("/dashboard/chat")) {
    return <AsideChat />;
  }

  // 그 외 경로일 때 기본 사이드바 내용
  return (
    <aside>
      <div className="sidemenu">
        <div className="sideTop">
          <h3>DashBoard</h3>
        </div>
        <Link to="/dashboard">Home</Link>
      </div>
    </aside>
  );
};

export default Aside;
