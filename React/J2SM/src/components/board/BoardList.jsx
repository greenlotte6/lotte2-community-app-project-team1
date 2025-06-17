import React, { useState, useEffect } from "react";
import WriteModal from "./WriteModal";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ARTICLE_LIST } from "../../api/_http";

const BoardList = () => {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [posts, setPosts] = useState([]);

  const location = useLocation();

  const categoryId = location.pathname.split("/")[4];

  // 게시글 목록 가져오기
  const fetchPosts = async () => {
    try {
      const res = await axios.get(ARTICLE_LIST(categoryId));
      setPosts(res.data);
    } catch (err) {
      console.error("게시글 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 등록 완료 후 리스트 추가
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <>
      <div className="line"></div>
      <div className="board-main">
        <div className="board-top">
          <select>
            <option>공지사항</option>
            <option>사내게시판</option>
            <option>익명게시판</option>
          </select>
          <div>
            <select>
              <option>전체</option>
              <option>제목</option>
              <option>글쓴이</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              style={{ width: "180px", margin: "0 5px" }}
            />
            <button>검색</button>
          </div>
        </div>

        <div className="board-click">
          <button onClick={() => setShowWriteModal(true)}>글쓰기</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" id="selectAll" />
              </th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <input type="checkbox" className="rowCheckbox" />
                  </td>
                  <td className="title">
                    <Link to={`/dashboard/board/view/${post.id}`}>
                      {post.title || "제목 없음"}
                    </Link>
                  </td>
                  <td>
                    {post.createdBy || post.writer?.name || "작성자 없음"}
                  </td>
                  <td>
                    {post.createdAt ? post.createdAt.substring(0, 10) : "-"}
                  </td>
                  <td>{post.hit ?? 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div id="pagination" className="pagination"></div>
      </div>

      {showWriteModal && (
        <WriteModal
          onClose={() => setShowWriteModal(false)}
          categoryId={categoryId}
          onPostCreated={handlePostCreated}
        />
      )}
    </>
  );
};

export default BoardList;
