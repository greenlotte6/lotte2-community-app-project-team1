import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BOARD } from "../../api/_http";
import useAuth from "../../hooks/useAuth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // h1, h2, 일반 텍스트
      ["bold", "italic", "underline", "strike", "blockquote"], // 볼드, 기울임꼴, 밑줄, 취소선, 인용구
      [{ list: "ordered" }, { list: "bullet" }], // 순서 있는 목록, 순서 없는 목록
      [{ indent: "-1" }, { indent: "+1" }], // 들여쓰기, 내어쓰기
      ["link", "image"], // 링크, 이미지 삽입 (비디오도 추가 가능)
      [{ color: [] }, { background: [] }], // 텍스트 색상, 배경색
      ["clean"], // 서식 지우기
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
  ];

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);
  /*
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  */

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

          <div className="form-group editor-container">
            <ReactQuill
              theme="snow" // 또는 "bubble"
              value={content}
              onChange={setContent}
              modules={modules} // 여기에 modules 변수 사용
              formats={formats} // 여기에 formats 변수 사용
              placeholder="내용을 입력하세요..."
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                minHeight: "200px",
                backgroundColor: "#fff",
              }}
            />
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
