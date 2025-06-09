import React, { useState } from "react";
import { saveMyPage } from "@/api/mypageapi"; // fetch 대신 axios 함수 import

export const MyTop = ({ editorRef }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleSave = async () => {
    if (!editorRef.current) return;

    try {
      const outputData = await editorRef.current.save();

      const data = {
        userId: 1, // 로그인 사용자 ID로 대체 예정
        content: outputData,
        isFavorite,
        shared: false,
      };

      await saveMyPage(data); // axios로 POST 요청 보내기
      alert("저장 완료!");
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
