import React, { useRef, useState, useEffect } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/MyPage.scss";
import { MyAside } from "../../components/MyPage/MyAside";
import { MyTop } from "../../components/MyPage/MyTop";
import { MyMid } from "../../components/MyPage/MyMid";
import { fetchAllPages, fetchTrashPages } from "@/api/myPageAPI";

const MyPage = () => {
  const editorRef = useRef(null);
  const [normalList, setNormalList] = useState([]);
  const [trashList, setTrashList] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  // ✅ DB에서 불러오기
  const loadPagesFromServer = async () => {
    try {
      const normal = await fetchAllPages(); // 정상 페이지
      const trash = await fetchTrashPages(); // 휴지통 페이지
      setNormalList(normal || []);
      setTrashList(trash || []);
    } catch (err) {
      console.error("페이지 로딩 실패", err);
    }
  };

  useEffect(() => {
    loadPagesFromServer();
  }, []);

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
