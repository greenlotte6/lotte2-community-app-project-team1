import React, { useRef, useState, useEffect } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/MyPage.scss";
import { MyAside } from "../../components/MyPage/MyAside";
import { MyTop } from "../../components/MyPage/MyTop";
import { MyMid } from "../../components/MyPage/MyMid";

const MyPage = () => {
  const editorRef = useRef(null);
  const [myPageList, setMyPageList] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  // 🔄 로컬스토리지 불러오기
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myPages") || "[]");
    setMyPageList(stored);
  }, []);

  // 🔥 페이지 선택 → Editor에 렌더
  const handleSelectPage = async (page) => {
    if (!editorRef.current) {
      console.warn("Editor 인스턴스가 아직 준비되지 않았습니다.");
      return;
    }

    try {
      await editorRef.current.isReady;

      let content;
      try {
        content = JSON.parse(page.content);
      } catch (e) {
        console.error("JSON 파싱 실패:", e);
        content = { blocks: [] };
      }

      // 🔒 fallback 블록 없을 때 대비
      if (!content.blocks) {
        content.blocks = [
          {
            type: "header",
            data: { text: "", level: 1 },
          },
        ];
      }

      await editorRef.current.render(content);
      setSelectedPage(page);
    } catch (err) {
      console.error("페이지 로딩 실패:", err);
    }
  };

  // 🔁 Editor 변경 → 제목 반영
  const handleEditorChange = (output) => {
    if (!selectedPage) return;

    const firstHeader = output.blocks.find((b) => b.type === "header");
    const newTitle = firstHeader?.data?.text || "제목 없음";

    const updatedPage = { ...selectedPage, title: newTitle };
    const updatedList = myPageList.map((p) =>
      p.id === updatedPage.id ? updatedPage : p
    );

    setSelectedPage(updatedPage);
    setMyPageList(updatedList);
    localStorage.setItem("myPages", JSON.stringify(updatedList));
  };

  return (
    <div id="MyPage">
      <DashboardLayout>
        <MyAside
          key={JSON.stringify(myPageList)} // 배열 전체 변경 감지
          myPageList={myPageList}
          onSelectPage={handleSelectPage}
        />
        <div className="contentArea">
          <MyTop
            editorRef={editorRef}
            setMyPageList={setMyPageList}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
          <MyMid
            editorRef={editorRef}
            onEditorChange={handleEditorChange}
            selectedPage={selectedPage}
          />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default MyPage;
