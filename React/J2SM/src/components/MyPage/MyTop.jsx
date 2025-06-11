import React, { useEffect, useState } from "react";
import { saveMyPage, softDeleteMyPage } from "@/api/myPageAPI"; // fetchAllPages는 이제 필요 없음
import useAuth from "../../hooks/useAuth";

export const MyTop = ({
  editorRef,
  selectedPage,
  setSelectedPage,
  reloadLists, // ✅ 이거 받기!
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { username } = useAuth();
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
        ...(selectedPage?.id && { id: selectedPage.id }),
        userId,
        title,
        content: JSON.stringify(output),
        isFavorite,
        shared: false,
      };

      await saveMyPage(payload);
      await reloadLists();
      alert("저장 완료!");
      window.location.reload();
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
      setSelectedPage(null);
      await reloadLists(); // ✅ 리스트 갱신만 호출!
      alert("휴지통으로 이동 완료!");

      window.location.reload();
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
