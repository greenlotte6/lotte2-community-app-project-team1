import { useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs"; // 🔥 꼭 필요
import InlineColorTool from "../../plugins/InlineColorTool"; // 🔥 꼭 필요

export const MyMid = ({ editorRef, onEditorChange, selectedPage }) => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const initEditor = async () => {
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const Checklist = (await import("@editorjs/checklist")).default;

      const _editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "제목을 입력하세요", // ✅ 요거 반드시
              levels: [1, 2, 3],
              defaultLevel: 1,
            },
          },
          list: List,
          paragraph: Paragraph,
          checklist: Checklist,
          color: { class: InlineColorTool },
        },
        data: {
          blocks: [
            {
              type: "header",
              data: { text: "", level: 1 },
            },
          ],
        },
        onReady: () => {
          editorRef.current = _editor;
          setEditor(_editor);
        },
        onChange: async () => {
          const output = await _editor.save();
          if (onEditorChange) onEditorChange(output);
        },
      });
    };

    initEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // 🔥 선택된 페이지가 바뀌면 렌더링
  // 🔥 선택된 페이지가 바뀌면 렌더링
  useEffect(() => {
    if (!editor || !selectedPage) return;

    try {
      let content = JSON.parse(selectedPage.content);

      // ✅ 첫 번째 블록이 header가 아니거나 text가 없으면 placeholder 유도
      const firstBlock = content.blocks?.[0];
      const isHeaderEmpty =
        !firstBlock ||
        firstBlock.type !== "header" ||
        !firstBlock.data?.text?.trim();

      if (!content.blocks || content.blocks.length === 0 || isHeaderEmpty) {
        content = {
          blocks: [
            {
              type: "header",
              data: { text: "", level: 1 },
            },
          ],
        };
      }

      editor.isReady.then(() => {
        editor.clear(); // 🧼 기존 block 제거
        editor.render(content); // 🆕 새로운 block 삽입 (placeholder 포함)
      });
    } catch (e) {
      console.error("selectedPage 렌더링 실패", e);
    }
  }, [selectedPage, editor]);

  return <div className="midArea" id="editorjs"></div>;
};
