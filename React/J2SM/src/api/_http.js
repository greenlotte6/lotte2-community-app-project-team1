// const SERVER_HOST = "http://localhost:8080";

// 베포 테스트
const isLocalhost = window.location.hostname.includes("localhost");

const SERVER_HOST = isLocalhost
  ? "http://localhost:8080" // 로컬 개발 서버
  : "http://3.34.124.218:8080"; // 운영 서버

// 버전 정보
export const VERSION = `${SERVER_HOST}/version`;

// user

export const USER_REGISTER = `${SERVER_HOST}/user`;
export const USER_LOGIN = `${SERVER_HOST}/user/login`;
export const USER_LOGOUT = `${SERVER_HOST}/user/logout`;

// 유저 아이디 체크
export const USER_ID_CHECK = `${SERVER_HOST}/user/idCheck`;
export const USER_HP_CHECK = `${SERVER_HOST}/user/hpCheck`;
export const USER_ID_SUCCESS = `${SERVER_HOST}/user/idCheck/success`;
export const USER_MEMBERSHIP_SAVE = `${SERVER_HOST}/user/membership`;

export const USER_EMAIL_CHECK = `${SERVER_HOST}/user/emailCheck`;
export const USER_EMAIL_SEND = `${SERVER_HOST}/user/emailSend`;
export const USER_EMAIL_VALID = `${SERVER_HOST}/user/emailCodeValid`;
export const USER_UID_BY_HP = `${SERVER_HOST}/user/findHp`;
export const USER_PASS_MODIFY = `${SERVER_HOST}/user/modify`;

// article
export const ARTICLE_WRITE = `${SERVER_HOST}/article`;
export const ARTICLE_LIST = `${SERVER_HOST}/article`;

// product
export const PRODUCT_REGISTER = `${SERVER_HOST}/product`;
export const PRODUCT_LIST = `${SERVER_HOST}/product`;
export const PRODUCT_THUMB = `${SERVER_HOST}/product/thumb`;

//문의하기
export const INQUIRE_REGISTER = `${SERVER_HOST}/qna`;

// 소켓 엔드포인트
export const SOCKET_URL = `${SERVER_HOST}/ws-chat`;

// 채팅 REST 엔드포인트 모음
export const API = {
  CHAT: {
    ROOM_LIST: `${SERVER_HOST}/api/chat/rooms`, // GET
    CREATE_ROOM: `${SERVER_HOST}/api/chat/rooms`, // POST
    DELETE_ROOM: (roomId) => `${SERVER_HOST}/api/chat/rooms/${roomId}`, // DELETE
    ROOM_DETAIL: (roomId) => `${SERVER_HOST}/api/chat/rooms/select/${roomId}`, // GET
    USER_LIST: (company) =>
      `${SERVER_HOST}/api/chat/users/by-company/${company}`, // ← 여기에 사용자 리스트 GET 추가
  },
};

// MyPage API
export const MYPAGE_SAVE = `${SERVER_HOST}/api/mypage/save`;
export const MYPAGE_GET_BY_ID = (id) => `${SERVER_HOST}/api/mypage/${id}`;
export const MYPAGE_LIST_BY_USER = (userId) =>
  `${SERVER_HOST}/api/mypage/list?userId=${userId}`;
export const MYPAGE_UPDATE = (id) => `${SERVER_HOST}/api/mypage/update/${id}`;
export const MYPAGE_DELETE = (id) => `${SERVER_HOST}/api/mypage/delete/${id}`;
