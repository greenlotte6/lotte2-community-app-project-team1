import { SERVER_HOST } from "./base";

// 마이페이지 저장 (POST)
export const MYPAGE_SAVE = `${SERVER_HOST}/api/mypage/save`;

// 마이페이지 단일 조회 (GET)
export const getMyPageById = (id) => `${SERVER_HOST}/api/mypage/${id}`;

// 마이페이지 목록 조회 (GET)
export const getMyPagesByUser = (userId) =>
  `${SERVER_HOST}/api/mypage/list?userId=${userId}`;

// 마이페이지 수정 (PUT)
export const updateMyPage = (id) => `${SERVER_HOST}/api/mypage/update/${id}`;

// 마이페이지 삭제 (DELETE)
export const deleteMyPage = (id) => `${SERVER_HOST}/api/mypage/delete/${id}`;
