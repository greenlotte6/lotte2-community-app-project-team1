import React, { useState, useEffect } from "react";
import WriteModal from "./WriteModal";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ARTICLE_LIST } from "../../api/_http";
import useAuth from "../../hooks/useAuth";
import "../../styles/DashBoard/boardlist.scss";

const BoardList = () => {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const { company } = useAuth();
  const location = useLocation();
  const categoryId = location.pathname.split("/")[4];

  // 검색 기능을 위한 새로운 상태 추가
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchCategory, setSearchCategory] = useState("전체"); // 검색 기준 상태 ('전체', '제목', '글쓴이')

  // 게시글 목록 가져오기
  const fetchPosts = async () => {
    if (!company) return;
    const cno = company.split(":")[0];
    try {
      const res = await axios.get(ARTICLE_LIST(categoryId, cno));
      setPosts(res.data);
    } catch (err) {
      console.error("게시글 불러오기 실패", err);
    }
  };

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  // 검색어와 검색 기준에 따라 게시글을 필터링하는 로직
  const filteredPosts = posts.filter((post) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    if (searchCategory === "전체") {
      // 제목 또는 작성자에 검색어가 포함되어 있는지 확인
      return (
        (post.title &&
          post.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (post.createdBy &&
          post.createdBy.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (post.writer?.name &&
          post.writer.name.toLowerCase().includes(lowerCaseSearchTerm))
      );
    } else if (searchCategory === "제목") {
      // 제목에만 검색어가 포함되어 있는지 확인
      return (
        post.title && post.title.toLowerCase().includes(lowerCaseSearchTerm)
      );
    } else if (searchCategory === "글쓴이") {
      // 작성자에만 검색어가 포함되어 있는지 확인
      return (
        (post.createdBy &&
          post.createdBy.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (post.writer?.name &&
          post.writer.name.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }
    return true; // 기본값 (모든 게시글 표시)
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!company) return;
    fetchPosts();
    setCurrentPage(1);
  }, [categoryId, company]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchCategory]);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <>
      <div className="line"></div>
      <div className="board-main">
        <div className="board-top">
          {/* 게시판 카테고리 선택 (기존 코드) */}
          <select>
            <option>공지사항</option>
            <option>사내게시판</option>
            <option>익명게시판</option>
          </select>
          <div>
            {/* 검색 기준 선택 드롭다운 */}
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="전체">전체</option>
              <option value="제목">제목</option>
              <option value="글쓴이">글쓴이</option>
            </select>
            {/* 검색어 입력 필드 */}
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              style={{ width: "180px", margin: "0 5px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setCurrentPage(1)}>검색</button>{" "}
            {/* 검색 버튼 클릭 시 첫 페이지로 이동 */}
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
            {Array.isArray(currentPosts) && currentPosts.length > 0 ? (
              currentPosts.map((post) => (
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
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPage === pageNum ? "#007bff" : "#fff",
              color: currentPage === pageNum ? "#fff" : "#000",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {pageNum}
          </button>
        ))}
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
