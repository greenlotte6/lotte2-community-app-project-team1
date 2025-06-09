import React, { useState } from "react";
import { MYPAGE_SAVE } from "@/api/mypageapi";

export const MyTop = ({ editorRef }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleSave = async () => {
    if (!editorRef.current) return;

    try {
      const outputData = await editorRef.current.save(); // Editor.js 내용 추출

      const response = await fetch(MYPAGE_SAVE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // 나중에 로그인 사용자 ID로 교체 예정
          content: outputData,
          isFavorite,
          shared: false,
        }),
      });

      if (response.ok) {
        alert("저장 완료!");
      } else {
        const errText = await response.text();
        alert("저장 실패: " + errText);
      }
    } catch (e) {
      console.error("저장 중 오류:", e);
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
