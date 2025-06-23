import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BOARD } from "../../api/_http";
import useAuth from "../../hooks/useAuth";

const WriteModal = ({ onClose, categoryId }) => {
  const modalRef = useRef(null);
  const { username } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null); // 첨부파일 상태

  // 바깥 클릭 시 닫기
  const handleOutsideClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // 등록 버튼 동작
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    try {
      const formData = new FormData();

      const post = {
        title,
        content,
        fixed: false,
        category: { id: categoryId },
      };

      const postBlob = new Blob([JSON.stringify(post)], {
        type: "application/json",
      });

      formData.append("post", postBlob);
      if (file) formData.append("file", file);

      await axios.post(BOARD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert("게시글이 등록되었습니다.");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("등록 실패:", error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <div
      className="modal-overlay"
      ref={modalRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 999,
      }}
    >
      <div className="">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <div className="modal-header">게시글 작성</div>
          <div className="modal-title">새 글쓰기</div>

          <div className="form-group">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group editor-toolbar">
            <button onClick={() => document.execCommand("bold")}>B</button>
            <select
              onChange={(e) =>
                document.execCommand("fontName", false, e.target.value)
              }
            >
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Courier New">Courier</option>
            </select>
            <select
              onChange={(e) =>
                document.execCommand("fontSize", false, e.target.value)
              }
            >
              <option value="1">크기 1</option>
              <option value="2">크기 2</option>
              <option value="3">크기 3</option>
              <option value="4">크기 4</option>
              <option value="5">크기 5</option>
            </select>
            <input
              type="color"
              onChange={(e) =>
                document.execCommand("foreColor", false, e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <div
              className="editor-area"
              contentEditable
              onInput={(e) => setContent(e.currentTarget.innerHTML)}
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                minHeight: "120px",
                backgroundColor: "#fff",
              }}
            ></div>
          </div>

          <div className="form-group">
            <label>파일 첨부</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>

          <div className="modal-footer">
            <span className="next-button" onClick={handleSubmit}>
              등록
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteModal;
