import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import InlineColorTool from "../../plugins/InlineColorTool";

export const MyMid = () => {
  const editorRef = useRef(null);
  const [isEditorReady, setEditorReady] = useState(false);

  useEffect(() => {
    const initEditor = async () => {
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const Checklist = (await import("@editorjs/checklist")).default;

      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: Header,
          list: List,
          paragraph: Paragraph,
          checklist: Checklist,
          color: {
            class: InlineColorTool,
          },
        },
      });

      editorRef.current = editor;
      setEditorReady(true);
    };

    initEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return <div className="midArea" id="editorjs"></div>;
};
