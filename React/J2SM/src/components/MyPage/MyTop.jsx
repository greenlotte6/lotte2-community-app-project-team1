import React, { useEffect, useState } from "react";
import { saveMyPage, softDeleteMyPage } from "@/api/myPageAPI"; // fetchAllPages는 이제 필요 없음
import useAuth from "../../hooks/useAuth";
import { deleteMyPage, shareMyPage } from "../../api/myPageAPI";
import UserShare from "./UserShare";

export const MyTop = ({
  editorRef,
  selectedPage,
  setSelectedPage,
  reloadLists,
  normalList = [],
  favoriteList = [],
  trashList = [],
  userGroups = [],
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
      await saveMyPage(updated); // 1. DB에 저장
      await reloadLists(); // 2. 리스트 재조회 (중복해도 됨)
      //setSelectedPage(updated); // 3. ★★★ 여기서 즉시 반영! ★★★
    } catch (e) {
      alert("즐겨찾기 변경 실패");
    }
  };
  const handleRestore = async () => {
    if (!selectedPage) return;
    try {
      const updated = {
        ...selectedPage,
        isDeleted: false,
      };
      await saveMyPage(updated); // 복원은 soft delete 해제
      setSelectedPage(updated);
      await reloadLists();
      alert("복원 완료!");
    } catch (e) {
      alert("복원 실패");
    }
  };

  // 공유 모달 상태
  const [showShareModal, setShowShareModal] = useState(false);

  // UserShare 관련 상태
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [expandedDepartments, setExpandedDepartments] = useState({});
  const channelType = "group"; // 상황 따라 "private" or "group"

  // 부서 펼치기/닫기
  const handleToggleDepartment = (dep) =>
    setExpandedDepartments((prev) => ({
      ...prev,
      [dep]: !prev[dep],
    }));

  // 사용자 선택
  const handleSelectUser = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.uid === user.uid) ? prev : [...prev, user]
    );
    // 필요하면 userGroups에서 해당 유저 제거 로직도 추가
  };

  // 선택 해제
  const handleRemoveUser = (user) => {
    setSelectedUsers((prev) => prev.filter((u) => u.uid !== user.uid));
    // 필요하면 userGroups에 다시 추가 로직도 추가
  };

  // 실제 공유 처리 함수(공유하기 버튼에서 실행)
  const handleShare = async () => {
    if (!selectedPage) {
      alert("공유할 페이지가 선택되지 않았습니다.");
      return;
    }
    try {
      console.log("🔵 공유하기 요청 시도", selectedPage, selectedUsers, userId);
      console.log("🔵 공유하기 요청 시도", selectedPage, selectedUsers, userId);
      console.log("🔵 공유하기 요청 시도", selectedPage, selectedUsers, userId);
      console.log("🔵 공유하기 요청 시도", selectedPage, selectedUsers, userId);
      await shareMyPage({
        mypageId: selectedPage.id,
        targetUserIds: selectedUsers.map((u) => u.uid),
        sharedBy: userId, // 로그인 유저의 uid
      });
      alert("공유 완료!");
      setShowShareModal(false);
      setSelectedUsers([]);
      setExpandedDepartments({});
    } catch (e) {
      alert("공유 실패! 관리자에게 문의하세요.");
    }
  };

  return (
    <div className="topArea">
      <div className="favoriteshare">
        {isTrashed ? (
          <>
            {/* 복원 버튼 */}
            <button className="restorebtn" onClick={handleRestore}>
              <img src="/images/Refresh cw.svg" alt="restore" />
            </button>
            {/* 영구 삭제 버튼 */}
            <button className="deletebtn" onClick={handlePermanentDelete}>
              <img src="/images/remove.png" alt="remove" />
            </button>
          </>
        ) : (
          <>
            {/* 휴지통 보내기 */}
            <button onClick={handleTrash}>
              <img src="/images/Trash 3 (1).svg" alt="trash" />
            </button>
            {/* 즐겨찾기 */}
            <button onClick={handleFavorite}>
              <img
                src={
                  selectedPage?.isFavorite
                    ? "/images/star_filled.svg"
                    : "/images/star.png"
                }
                alt="fav"
                style={{ width: "20px", height: "20px" }}
              />
            </button>
            {/* 저장 */}
            <button className="savebtn" onClick={handleSave}>
              저장하기
            </button>
            {/* 공유 */}
            <button
              className="sharebtn"
              onClick={() => setShowShareModal(true)}
            >
              <p>공유하기</p>
            </button>
          </>
        )}
      </div>
      {/* 공유하기 모달 */}
      {showShareModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ minWidth: 480 }}
          >
            <button
              className="modal-close"
              onClick={() => setShowShareModal(false)}
            >
              ✕
            </button>
            <h2>공유 대상 선택</h2>
            <UserShare
              userGroups={userGroups}
              selected={selectedUsers}
              expandedDepartments={expandedDepartments}
              handleToggleDepartment={handleToggleDepartment}
              handleSelectUser={handleSelectUser}
              handleRemoveUser={handleRemoveUser}
              channelType={channelType}
            />
            <div className="actions">
              <button
                className="btn-secondary"
                onClick={() => setShowShareModal(false)}
              >
                취소
              </button>
              <button
                className="btn-primary"
                disabled={selectedUsers.length < 1 || !selectedPage}
                onClick={handleShare}
              >
                공유하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
