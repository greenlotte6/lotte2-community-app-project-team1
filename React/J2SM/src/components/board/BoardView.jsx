import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BoardView = () => {
  const { id } = useParams(); // URL에서 글 ID 추출
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/boards/${id}`, {
          withCredentials: true,
        });
        setPost(res.data);
        setComments(res.data.comments || []); // 댓글 포함 시
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <>
      <div className="line"></div>
      <div className="contents-main">
        <div className="post-header">
          <div className="post-title">{post?.title || "제목 없음"}</div>
          <div className="post-meta">
            작성자: {post?.writer?.name || "작성자 없음"} | 작성일:{" "}
            {post.createdAt ? post.createdAt.substring(0, 10) : "-"} | 조회수:{" "}
            {post.hit}
          </div>
        </div>

        <div className="post-content">{post.content}</div>

        {post.attachments?.length > 0 && (
          <div className="post-attachments">
            <h4>첨부파일</h4>
            <ul>
              {post.attachments.map((file, index) => (
                <li key={index}>
                  <a href={`/uploads/${file}`} download>
                    {file}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form className="comment-form">
          <button className="memo-button" type="button">
            삭제
          </button>
          <button className="memo-button" type="button">
            수정
          </button>
        </form>

        <div className="comment-section">
          <h3>댓글</h3>
          <form className="comment-form">
            <textarea placeholder="댓글을 입력하세요..."></textarea>
            <button type="submit">등록</button>
          </form>

          <div className="comment-list">
            {comments.map((comment, idx) => (
              <div className="comment" key={idx}>
                <div className="comment-author">{comment.author}</div>
                <div className="comment-content">{comment.content}</div>

                <button className="comment-options-button">⋮</button>
                <div className="comment-options-menu">
                  <button className="edit-comment">수정</button>
                  <button className="delete-comment">삭제</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardView;
