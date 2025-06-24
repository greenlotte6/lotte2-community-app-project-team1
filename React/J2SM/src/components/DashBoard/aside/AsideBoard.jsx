import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { CATEGORY_DELETE, CATEGORY_LIST } from "../../../api/_http";
import BoardModal from "../../board/BoardModal"; // 모달 컴포넌트 임포트
import axios from "axios";

const AsideBoard = () => {
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

  const { membership } = useAuth();

  // ✅ 게시판 생성
  const handleBoardCreate = async (boardName) => {
    if (!cno) return alert("회사 정보가 없습니다.");
    if (membership === "free" && categories.length >= 3) {
      alert("Free 요금제는 최대 3개의 게시판만 생성할 수 있습니다.");
      return;
    }
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

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(CATEGORY_DELETE(categoryId));
      alert("삭제되었습니다.");
      fetchCategories(); // 목록 새로고침
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제에 실패했습니다.");
    }
  };
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

            <div className="side-icon">
              <button
                className="side-click"
                onClick={handleBoardModalOpen}
                disabled={membership === "Free" && categories.length >= 3}
                style={{
                  opacity:
                    membership === "Free" && categories.length >= 3 ? 0.5 : 1,
                  cursor:
                    membership === "Free" && categories.length >= 3
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                + New BOARD
              </button>
            </div>

            {categories.map((cat) => (
              <div
                className="menuItem"
                key={cat.id}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img src="/images/File text.svg" alt="board" />
                <Link
                  to={`/dashboard/board/list/${cat.id}`}
                  style={{ flex: 1 }}
                >
                  {cat.name === "공지사항" ? "🔒 " : ""}
                  {cat.name}
                </Link>

                {cat.name !== "공지사항" && (
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                    title="삭제"
                  >
                    🗑
                  </button>
                )}

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
};

export default AsideBoard;
