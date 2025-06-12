import React, { useRef, useState, useEffect } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/MyPage.scss";
import { MyAside } from "../../components/MyPage/MyAside";
import { MyTop } from "../../components/MyPage/MyTop";
import { MyMid } from "../../components/MyPage/MyMid";
import {
  fetchAllPagesByUser,
  fetchFavoritesPagesByUser,
  fetchTrashPagesByUser,
} from "../../api/myPageAPI";
import useAuth from "../../hooks/useAuth";

const MyPage = () => {
  const editorRef = useRef(null);
  const [normalList, setNormalList] = useState([]);
  const [trashList, setTrashList] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);
  const { username } = useAuth();
  const userId = username;
  const fixBoolean = (v) => v === true || v === 1 || v === "1";

  // ✅ DB에서 불러오기
  const loadPagesFromServer = async () => {
    try {
      const normalRaw = await fetchAllPagesByUser(userId); // 정상 페이지
      const trashRaw = await fetchTrashPagesByUser(userId); // 휴지통 페이지
      const favoritesRaw = await fetchFavoritesPagesByUser(userId); // 휴지통 페이지

      // ⭐️ 여기서 isFavorite을 boolean으로 통일해서 저장!
      const normal = (normalRaw || []).map((p) => ({
        ...p,
        isFavorite: fixBoolean(p.isFavorite),
      }));
      const trash = (trashRaw || []).map((p) => ({
        ...p,
        isFavorite: fixBoolean(p.isFavorite),
      }));
      const favorites = (favoritesRaw || []).map((p) => ({
        ...p,
        isFavorite: true, // 어차피 즐겨찾기만 모아서 줌
      }));

      setNormalList(normal);
      setTrashList(trash);
      setFavoriteList(favorites);
    } catch (err) {
      console.error("페이지 로딩 실패", err);
    }
  };

  useEffect(() => {
    if (!userId) return;
    loadPagesFromServer();
  }, [userId]);

  // ✅ 선택된 페이지를 Editor에 렌더
  const handleSelectPage = async (page) => {
    if (!editorRef.current || !page) return;

    try {
      await editorRef.current.isReady;
      const content = JSON.parse(page.content || '{"blocks": []}');
      if (!content.blocks) content.blocks = [];
      await editorRef.current.render(content);
      setSelectedPage(page);
    } catch (err) {
      console.error("Editor 렌더 실패", err);
    }
  };

  const handleEditorChange = (output) => {
    if (!selectedPage) return;
    const firstHeader = output.blocks.find((b) => b.type === "header");
    const newTitle = firstHeader?.data?.text || "제목 없음";
    const updatedPage = { ...selectedPage, title: newTitle };
    const updatedList = normalList.map((p) =>
      p.id === updatedPage.id ? updatedPage : p
    );
    setSelectedPage(updatedPage);
    setNormalList(updatedList);
  };
  return (
    <div id="MyPage">
      <DashboardLayout>
        <MyAside
          normalList={normalList}
          trashList={trashList}
          favoriteList={favoriteList}
          onSelectPage={handleSelectPage}
        />
        <div className="contentArea">
          <MyTop
            editorRef={editorRef}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            reloadLists={loadPagesFromServer}
          />
          <MyMid
            editorRef={editorRef}
            selectedPage={selectedPage}
            onEditorChange={handleEditorChange}
          />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default MyPage;
