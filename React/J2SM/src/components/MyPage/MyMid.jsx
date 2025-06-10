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
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "제목을 입력하세요", // 👈 이거 꼭 넣어야 함
              levels: [1, 2, 3],
              defaultLevel: 1,
            },
          },
          list: List,
          paragraph: Paragraph,
          checklist: Checklist,
          color: { class: InlineColorTool },
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

  // 선택된 페이지 변경 시 렌더
  useEffect(() => {
    if (!editor || !selectedPage) return;

    try {
      const content = JSON.parse(selectedPage.content || '{"blocks": []}');
      editor.isReady.then(() => {
        editor.clear();
        editor.render(content);
      });
    } catch (err) {
      console.error("페이지 렌더 실패", err);
    }
  }, [selectedPage, editor]);

  return <div className="midArea" id="editorjs"></div>;
};
