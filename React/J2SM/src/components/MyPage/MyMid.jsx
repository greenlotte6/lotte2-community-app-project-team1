import { useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import InlineColorTool from "../../plugins/InlineColorTool";

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
            class: Header, // ok
            inlineToolbar: true,
            config: {
              placeholder: "제목을 입력하세요",
              levels: [1, 2, 3],
              defaultLevel: 1,
            },
          },
          list: List,
          paragraph: Paragraph,
          checklist: Checklist,
          color: { class: InlineColorTool }, // 여기도 class!!
        },

        data: { blocks: [{ type: "header", data: { text: "", level: 1 } }] },
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

  // ✅ 에디터와 페이지가 모두 준비된 뒤 렌더!
  useEffect(() => {
    if (!editor || !selectedPage) return;
    const renderContent = async () => {
      try {
        const content = JSON.parse(selectedPage.content || '{"blocks": []}');
        await editor.isReady; // 반드시 준비됐을 때만
        await editor.clear(); // 꼭 await!
        await editor.render(content); // 꼭 await!
      } catch (err) {
        console.error("페이지 렌더 실패", err);
      }
    };
    renderContent();
  }, [selectedPage, editor]);

  return <div className="midArea" id="editorjs"></div>;
};
