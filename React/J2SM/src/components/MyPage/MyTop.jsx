import React, { useState, useEffect } from "react";
import { saveMyPage } from "@/api/mypageapi";

export const MyTop = ({
  editorRef,
  setMyPageList,
  selectedPage,
  setSelectedPage,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (selectedPage) {
      setIsFavorite(selectedPage.isFavorite || false);
    } else {
      setIsFavorite(false);
    }
  }, [selectedPage]);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleSave = async () => {
    if (!editorRef.current) return;

    try {
      const outputData = await editorRef.current.save();
      const firstHeader = outputData.blocks.find(
        (block) => block.type === "header"
      );
      const title = firstHeader?.data?.text || "제목 없음";

      const newPage = {
        id: selectedPage?.id || crypto.randomUUID(),
        userId: 1,
        title,
        content: JSON.stringify(outputData),
        isFavorite,
        shared: false,
      };

      // 백엔드 저장
      await saveMyPage(newPage);

      // 로컬스토리지 업데이트
      const prev = JSON.parse(localStorage.getItem("myPages") || "[]");
      const updated = selectedPage
        ? prev.map((p) => (p.id === newPage.id ? newPage : p))
        : [...prev, newPage];

      localStorage.setItem("myPages", JSON.stringify(updated));
      setMyPageList(updated);
      alert(selectedPage ? "수정 완료!" : "저장 완료!");

      // ✅ 저장한 페이지를 다시 선택해서 보여주기
      setSelectedPage(newPage); // ⭐ 이거만 있으면 render() 따로 안 해도 됨
    } catch (e) {
      console.error("저장 실패", e);
      alert("저장 중 오류 발생");
    }
  };

  return (
    <div className="topArea">
      <div className="favoriteshare">
        <button onClick={toggleFavorite}>
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
