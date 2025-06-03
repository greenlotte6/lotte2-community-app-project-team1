// editor-init.js
window.addEventListener("DOMContentLoaded", () => {
  const editor = new EditorJS({
    holder: "editorjs",
    placeholder: "시작해보세요...",
    tools: {
      paragraph: { class: Paragraph, inlineToolbar: true },
      header: { class: Header, inlineToolbar: true },
      list: { class: List, inlineToolbar: true },
      checklist: { class: Checklist, inlineToolbar: true },
    },
  });
});
