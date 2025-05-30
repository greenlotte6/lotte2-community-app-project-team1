import axios from "axios";
import { PRODUCT_LIST, PRODUCT_REGISTER } from "./_http";

export const getProductAll = async (pg) => {
  try {
    const response = await axios.get(`${PRODUCT_LIST}?pg=${pg}`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postProduct = async (data) => {
  try {
    const response = await axios.post(`${PRODUCT_REGISTER}`, data, {
      withCredentials: true, // 브라우저에서 쿠키, 인증 헤더, TLS 인증서 등의 자격 증명을 요청에 포함하도록 설정하는 옵션
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
