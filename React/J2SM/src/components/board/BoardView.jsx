import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth"; // 현재 로그인한 사용자 정보 가져오기

const BoardView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuth(); // 현재 로그인한 사용자 정보 (authUser.uid 사용)

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  // 댓글 수정 관련 상태
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글의 ID
  const [editedCommentContent, setEditedCommentContent] = useState(""); // 수정 중인 댓글의 내용

  // 게시글 상세 및 댓글 목록 불러오기
  const fetchPostAndComments = async () => {
    try {
      const postRes = await axios.get(
        `http://localhost:8080/api/boards/${id}`,
        {
          withCredentials: true,
        }
      );
      setPost(postRes.data);

      const commentsRes = await axios.get(
        `http://localhost:8080/api/boards/${id}/comments`,
        {
          withCredentials: true,
        }
      );
      setComments(commentsRes.data || []);
    } catch (err) {
      console.error("게시글 또는 댓글 불러오기 실패", err);
      // 에러 처리: 사용자에게 메시지 표시, 홈으로 리다이렉트 등
    }
  };

  useEffect(() => {
    fetchPostAndComments();
  }, [id]);

  // 수정모드 진입 시 기존 제목/내용 세팅
  useEffect(() => {
    if (post && editMode) {
      setEditedTitle(post.title);
      setEditedContent(post.content);
    }
  }, [post, editMode]);

  // 게시글 삭제 처리
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/boards/${id}`, {
        withCredentials: true,
      });
      alert("게시글이 삭제되었습니다.");
      navigate("/dashboard/board/main");
    } catch (err) {
      console.error("게시글 삭제 실패", err);
      if (err.response && err.response.status === 403) {
        alert("게시글을 삭제할 권한이 없습니다.");
      } else {
        alert("삭제에 실패했습니다.");
      }
    }
  };

  // 게시글 수정 처리
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/boards/${id}`,
        {
          title: editedTitle,
          content: editedContent,
        },
        { withCredentials: true }
      );
      setPost(res.data);
      setEditMode(false);
      alert("게시글 수정 완료");
    } catch (err) {
      console.error("게시글 수정 실패", err);
      if (err.response && err.response.status === 403) {
        alert("게시글을 수정할 권한이 없습니다.");
      } else {
        alert("게시글 수정 실패.");
      }
    }
  };

  // 댓글 등록 함수
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newCommentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/boards/${id}/comments`,
        { content: newCommentContent },
        { withCredentials: true }
      );
      setComments((prevComments) => [...prevComments, res.data]);
      setNewCommentContent("");
      alert("댓글이 등록되었습니다.");
    } catch (err) {
      console.error("댓글 등록 실패", err);
      if (err.response && err.response.status === 403) {
        alert("댓글을 작성할 권한이 없습니다. 로그인 상태를 확인해주세요.");
      } else {
        alert("댓글 등록에 실패했습니다.");
      }
    }
  };

  // 댓글 수정 모드 진입
  const handleEditCommentClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentContent(comment.content);
  };

  // 댓글 수정 저장
  const handleSaveEditedComment = async (commentId) => {
    if (!editedCommentContent.trim()) {
      alert("수정할 댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8080/api/boards/${id}/comments/${commentId}`,
        { content: editedCommentContent },
        { withCredentials: true }
      );
      // 수정된 댓글로 comments 상태 업데이트
      setComments((prevComments) =>
        prevComments.map((c) => (c.id === commentId ? res.data : c))
      );
      setEditingCommentId(null); // 수정 모드 종료
      setEditedCommentContent(""); // 입력 필드 초기화
      alert("댓글이 수정되었습니다.");
    } catch (err) {
      console.error("댓글 수정 실패", err);
      if (err.response && err.response.status === 403) {
        alert("댓글을 수정할 권한이 없습니다.");
      } else {
        alert("댓글 수정에 실패했습니다.");
      }
    }
  };

  // 댓글 수정 취소
  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("정말 이 댓글을 삭제하시겠습니까?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/boards/${id}/comments/${commentId}`,
        {
          withCredentials: true,
        }
      );
      // 삭제된 댓글을 제외하고 comments 상태 업데이트
      setComments((prevComments) =>
        prevComments.filter((c) => c.id !== commentId)
      );
      alert("댓글이 삭제되었습니다.");
    } catch (err) {
      console.error("댓글 삭제 실패", err);
      if (err.response && err.response.status === 403) {
        alert("댓글을 삭제할 권한이 없습니다.");
      } else {
        alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <>
      <div className="line"></div>
      <div className="contents-main">
        <div className="post-header">
          <div className="post-title">
            {editMode ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              post.title || "제목 없음"
            )}
          </div>
          <div className="post-meta">
            작성자: {post.writer?.name || "작성자 없음"} | 작성일:{" "}
            {post.createdAt ? post.createdAt.substring(0, 10) : "-"} | 조회수:{" "}
            {post.hit ?? 0}
          </div>
        </div>

        {editMode ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{ width: "100%", minHeight: "200px", margin: "20px 0" }}
          />
        ) : (
          <div className="post-content">{post.content}</div>
        )}

        {post.attachments && post.attachments.length > 0 && (
          <div className="post-attachments">
            <h4>첨부파일</h4>
            <ul>
              {post.attachments.map((file, index) => (
                <li key={index}>
                  <a
                    href={`http://localhost:8080${file.savedPath}`}
                    download={file.fileName}
                  >
                    {file.fileName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="comment-form" style={{ marginTop: "20px" }}>
          {editMode ? (
            <>
              <button className="memo-button" onClick={handleUpdate}>
                저장
              </button>
              <button
                className="memo-button"
                onClick={() => setEditMode(false)}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button className="memo-button" onClick={handleDelete}>
                삭제
              </button>
              <button className="memo-button" onClick={() => setEditMode(true)}>
                수정
              </button>
            </>
          )}
        </div>

        <div className="comment-section">
          <h3>댓글</h3>
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="댓글을 입력하세요..."
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
            ></textarea>
            <button type="submit">등록</button>
          </form>
          <div className="comment-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <div className="comment-meta">
                    <span className="comment-author">
                      {comment.writer?.name || "익명"}
                    </span>
                    <span className="comment-date">
                      {comment.createdAt
                        ? comment.createdAt.substring(0, 10)
                        : ""}
                    </span>
                    {/* 현재 로그인 사용자와 댓글 작성자가 동일한 경우에만 수정/삭제 버튼 표시 */}
                    {authUser && authUser.uid === comment.writer?.uid && (
                      <div className="comment-actions">
                        {editingCommentId === comment.id ? (
                          <>
                            <button
                              className="memo-button"
                              onClick={() =>
                                handleSaveEditedComment(comment.id)
                              }
                            >
                              저장
                            </button>
                            <button
                              className="memo-button"
                              onClick={handleCancelEditComment}
                            >
                              취소
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="memo-button"
                              onClick={() => handleEditCommentClick(comment)}
                            >
                              수정
                            </button>
                            <button
                              className="memo-button"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              삭제
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="comment-content">
                    {editingCommentId === comment.id ? (
                      <textarea
                        value={editedCommentContent}
                        onChange={(e) =>
                          setEditedCommentContent(e.target.value)
                        }
                        style={{ width: "100%", minHeight: "60px" }}
                      />
                    ) : (
                      comment.content
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>아직 댓글이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardView;
