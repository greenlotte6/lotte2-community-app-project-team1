import React, { use, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import useCates from "../../hooks/useCates";
import { postArticle } from "../../api/articleAPI";

const Write = () => {
  const navigate = useNavigate();
  const [cate1, cate2] = useCates();
  const { username } = useAuth();

  const [article, setArticle] = useState({
    cate: cate2,
    title: "",
    content: "",
    writer: username,
  });

  // 로그인을 안하면 로그인 이동
  if (!username) {
    alert("로그인을 해야 합니다.");
    return <Navigate to="/user/login" />;
  }

  // 핸들러
  const changeHandler = (e) => {
    e.preventDefault();
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(article);

    // 서버 요청 정의
    const fetchData = async () => {
      try {
        // 글 등록 요청
        const data = await postArticle(article);
        console.log(data);

        // 글 목록 이동
        navigate(`/board/list?cate1=${cate1}&cate2=${cate2}`);
      } catch (err) {
        console.error(err);
      }
    };

    // 호출
    fetchData();
  };

  return (
    <div id="board">
      <section class="write">
        <h1>글쓰기</h1>
        <form onSubmit={submitHandler}>
          <table border="0">
            <tr>
              <th>제목</th>
              <td>
                <input
                  type="text"
                  name="title"
                  value={article.title}
                  onChange={changeHandler}
                  placeholder="제목을 입력하세요."
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  name="content"
                  value={article.content}
                  onChange={changeHandler}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>파일</th>
              <td>
                <p>최대 2개 파일 첨부 가능, 각 파일당 최대 10MB까지 가능</p>
                <input type="file" name="file1" />
                <input type="file" name="file2" />
              </td>
            </tr>
          </table>

          <div>
            <a href="./list.html" class="btn btnCancel">
              취소
            </a>
            <input type="submit" value="작성완료" class="btn btnComplete" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Write;
