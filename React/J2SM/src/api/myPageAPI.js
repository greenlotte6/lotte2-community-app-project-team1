// 📁 mypageApi.js
import axios from "axios";
import {
  MYPAGE_SAVE,
  MYPAGE_GET_BY_ID,
  MYPAGE_LIST_BY_USER,
  MYPAGE_UPDATE,
  MYPAGE_DELETE,
} from "./_http";

// 저장
export const saveMyPage = async (data) => {
  try {
    const response = await axios.post(MYPAGE_SAVE, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 단건 조회
export const fetchMyPage = async (id) => {
  try {
    const response = await axios.get(MYPAGE_GET_BY_ID(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 사용자 전체 페이지 조회
export const fetchMyPagesByUser = async (userId) => {
  try {
    const response = await axios.get(MYPAGE_LIST_BY_USER(userId), {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 수정
export const updateMyPage = async (id, data) => {
  try {
    const response = await axios.put(MYPAGE_UPDATE(id), data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 삭제
export const deleteMyPage = async (id) => {
  try {
    const response = await axios.delete(MYPAGE_DELETE(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
