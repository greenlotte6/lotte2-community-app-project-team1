import axios from "axios";
import { ARTICLE_LIST, ARTICLE_WRITE } from "./_http";

export const getArticleAll = async (pg, cate) => {
  try {
    const response = await axios.get(`${ARTICLE_LIST}?pg=${pg}&cate=${cate}`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postArticle = async (data) => {
  try {
    const response = await axios.post(`${ARTICLE_WRITE}`, data, {
      withCredentials: true, // 브라우저에서 쿠키, 인증 헤더, TLS 인증서 등의 자격 증명을 요청에 포함하도록 설정하는 옵션
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
