import React, { useEffect, useState } from "react";
import { saveMyPage, softDeleteMyPage } from "@/api/myPageAPI"; // fetchAllPages는 이제 필요 없음
import useAuth from "../../hooks/useAuth";
import { deleteMyPage } from "../../api/myPageAPI";

export const MyTop = ({
  editorRef,
  selectedPage,
  setSelectedPage,
  reloadLists, // ✅ 이거 받기!
}) => {
  const isTrashed = selectedPage?.isDeleted;
  const [isFavorite, setIsFavorite] = useState(false);
  const { username } = useAuth();
  const userId = username;

  useEffect(() => {
    setIsFavorite(selectedPage?.isFavorite || false);
  }, [selectedPage]);

  const handlePermanentDelete = async () => {
    if (!window.confirm("정말 영구 삭제하시겠습니까? 복구 불가합니다.")) return;
    await deleteMyPage(selectedPage.id);
    setSelectedPage(null); // 삭제 후 선택 해제
    if (reloadLists) reloadLists(); // 목록 갱신
    window.location.reload();
  };

  const handleSave = async () => {
    if (!editorRef.current) return;
    try {
      const output = await editorRef.current.save();
      const firstHeader = output.blocks.find((b) => b.type === "header");
      const title = firstHeader?.data?.text || "제목 없음";
      // isFavorite만 남기고 favorite 날림!
      const { favorite, ...rest } = selectedPage || {};
      const payload = {
        ...rest,
        userId,
        title,
        content: JSON.stringify(output),
        isFavorite: selectedPage?.isFavorite || false,
        shared: false,
      };
      console.log("⭐️ 최종 saveMyPage payload", payload);
      console.log("⭐️ 최종 saveMyPage payload", payload);
      console.log("⭐️ 최종 saveMyPage payload", payload);
      console.log("⭐️ 최종 saveMyPage payload", payload);

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

  const handleFavorite = async () => {
    if (!selectedPage) return;
    try {
      const updated = {
        ...selectedPage,
        isFavorite: !selectedPage.isFavorite,
      };
      await saveMyPage(updated);
      // 저장 후 리스트와 선택된 페이지를 모두 새로고침
      await reloadLists();
      setSelectedPage({ ...updated, isFavorite: !!updated.isFavorite });
    } catch (e) {
      alert("즐겨찾기 변경 실패");
    }
  };

  return (
    <div className="topArea">
      <div className="favoriteshare">
        {isTrashed ? (
          <button className="deletebtn" onClick={handlePermanentDelete}>
            <img src="/images/remove.png" alt="remove" />
          </button>
        ) : (
          <button onClick={handleTrash}>
            <img src="/images/Trash 3 (1).svg" alt="trash" />
          </button>
        )}
        <button onClick={handleFavorite}>
          <img
            src={
              selectedPage?.isFavorite === true ||
              selectedPage?.isFavorite === 1 ||
              selectedPage?.isFavorite === "1"
                ? "/images/star_filled.svg"
                : "/images/star.png"
            }
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
