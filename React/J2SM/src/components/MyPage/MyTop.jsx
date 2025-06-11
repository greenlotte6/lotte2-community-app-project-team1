import React, { useEffect, useState } from "react";
import { saveMyPage, softDeleteMyPage, fetchAllPages } from "@/api/myPageAPI";
import useAuth from "../../hooks/useAuth";

export const MyTop = ({
  editorRef,
  selectedPage,
  setSelectedPage,
  setMyPageList,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { username } = useAuth(); // ✅ 여기서 userId를 가져옴
  const userId = username;

  useEffect(() => {
    setIsFavorite(selectedPage?.isFavorite || false);
  }, [selectedPage]);

  const handleSave = async () => {
    if (!editorRef.current) return;

    try {
      const output = await editorRef.current.save();
      const firstHeader = output.blocks.find((b) => b.type === "header");
      const title = firstHeader?.data?.text || "제목 없음";

      const payload = {
        userId, // ✅ 추후 로그인 연동 시 교체
        title,
        content: JSON.stringify(output),
        isFavorite,
        shared: false,
      };

      await saveMyPage(payload);

      const pages = await fetchAllPages();
      setMyPageList(pages);
      const saved = pages.find((p) => p.title === title);
      if (saved) setSelectedPage(saved);

      alert("저장 완료!");
    } catch (err) {
      console.error("저장 실패", err);
      alert("저장 중 오류 발생");
    }
  };

  const handleTrash = async () => {
    if (!selectedPage?.id) return;

    if (!window.confirm("휴지통으로 이동할까요?")) return;

    try {
      await softDeleteMyPage(selectedPage.id);
      const pages = await fetchAllPages();
      setMyPageList(pages);
      setSelectedPage(null);
      alert("휴지통으로 이동 완료");
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  return (
    <div className="topArea">
      <div className="favoriteshare">
        <button onClick={handleTrash}>
          <img src="/images/Trash 3 (1).svg" alt="trash" />
        </button>
        <button onClick={() => setIsFavorite((prev) => !prev)}>
          <img
            src={isFavorite ? "/images/star_filled.svg" : "/images/star.png"}
            alt="fav"
            style={{ width: "20px", height: "20px" }}
          />
        </button>
        <button className="savebtn" onClick={handleSave}>
          저장하기
        </button>
        <button>
          <p>공유하기</p>
        </button>
      </div>
    </div>
  );
};
