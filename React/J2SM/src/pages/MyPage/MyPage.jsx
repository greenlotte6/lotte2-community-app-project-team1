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
  fetchUserGroups,
  fetchSharedPagesByUser,
} from "../../api/myPageAPI";
import useAuth from "../../hooks/useAuth";

const MyPage = () => {
  const editorRef = useRef(null);
  const [normalList, setNormalList] = useState([]);
  const [trashList, setTrashList] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);
  const [userGroups, setUserGroups] = useState([]); // ⭐️ 추가!
  const { username, company } = useAuth();
  const userId = username;
  const fixBoolean = (v) => v === true || v === 1 || v === "1";
  const [sharedList, setSharedList] = useState([]);

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
  const getPureCompanyName = (raw) =>
    raw && raw.includes(":") ? raw.split(":")[1] : raw;
  useEffect(() => {
    if (!company) return;
    const companyName = getPureCompanyName(company);
    console.log("회사명(companyName):", companyName);
    fetchUserGroups(companyName).then((groups) => {
      console.log("⭐️ 받아온 userGroups:", groups);
      setUserGroups(groups);
    });
  }, [company]);

  useEffect(() => {
    if (!userId) return;
    loadPagesFromServer();
  }, [userId]);

  useEffect(() => {
    if (!selectedPage) return;
    const allPages = [...normalList, ...favoriteList, ...trashList];
    const latest = allPages.find((p) => p.id === selectedPage.id);
    if (latest && latest.isFavorite !== selectedPage.isFavorite) {
      setSelectedPage(latest);
    }
  }, [normalList, favoriteList, trashList]);

  // ✅ 선택된 페이지를 Editor에 렌더
  const handleSelectPage = async (page) => {
    if (!editorRef.current || !page) return;

    // 🟢 모든 리스트를 합쳐서 최신 객체를 찾아서 사용!
    const allPages = [...normalList, ...favoriteList, ...trashList];
    const latest = allPages.find((p) => p.id === page.id) || page;

    try {
      await editorRef.current.isReady;
      const content = JSON.parse(latest.content || '{"blocks": []}');
      if (!content.blocks) content.blocks = [];
      await editorRef.current.render(content);
      setSelectedPage(latest);
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
  useEffect(() => {
    if (!userId) return;
    loadSharedPages();
  }, [userId]);

  const loadSharedPages = async () => {
    try {
      if (!userId) return;
      const sharedRaw = await fetchSharedPagesByUser(userId);
      // 페이지 객체 가공 필요시 여기서
      setSharedList(sharedRaw || []);
    } catch (err) {
      console.error("공유받은 페이지 로딩 실패", err);
    }
  };
  return (
    <div id="MyPage">
      <DashboardLayout>
        <MyAside
          normalList={normalList}
          trashList={trashList}
          favoriteList={favoriteList}
          sharedList={sharedList}
          onSelectPage={handleSelectPage}
        />
        <div className="contentArea">
          <MyTop
            editorRef={editorRef}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            reloadLists={loadPagesFromServer}
            normalList={normalList}
            favoriteList={favoriteList}
            trashList={trashList}
            userGroups={userGroups}
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
