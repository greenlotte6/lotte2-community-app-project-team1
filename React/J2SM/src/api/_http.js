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
    ROOM_LIST: (userId) => `${SERVER_HOST}/api/chat/rooms/${userId}`, // GET
    CREATE_ROOM: `${SERVER_HOST}/api/chat/rooms`, // POST
    DELETE_ROOM: (roomId) => `${SERVER_HOST}/api/chat/rooms/${roomId}`, // DELETE
    ROOM_DETAIL: (roomId) => `${SERVER_HOST}/api/chat/rooms/select/${roomId}`, // GET
    USER_LIST: (company) =>
      `${SERVER_HOST}/api/chat/users/by-company/${company}`, // ← 여기에 사용자 리스트 GET 추가
    MARK_READ: (roomId) => `${SERVER_HOST}/api/chat/rooms/${roomId}/read`, // 안읽은 메시지 숫자 0으로 초기화
    UPDATE_ROOM_NAME: (roomId) =>
      `${SERVER_HOST}/api/chat/rooms/${roomId}/name`, // PUT (채팅방 이름 변경)
  },
};

// MyPage API

// 저장 (POST /api/mypage/save)
export const MYPAGE_SAVE = `${SERVER_HOST}/api/mypage/save`;

// 전체 목록 (GET /api/mypage/list)
export const MYPAGE_LIST = `${SERVER_HOST}/api/mypage/list`;

// 🗑 휴지통으로 이동 (PUT /api/mypage/trash/{id})
export const MYPAGE_SOFT_DELETE = (id) =>
  `${SERVER_HOST}/api/mypage/trash/${id}`;

// ♻️ 복원 (PUT /api/mypage/restore/{id})
export const MYPAGE_RESTORE = (id) => `${SERVER_HOST}/api/mypage/restore/${id}`;

// ❌ 영구 삭제 (DELETE /api/mypage/delete/{id})
export const MYPAGE_DELETE = (id) => `${SERVER_HOST}/api/mypage/delete/${id}`;

// 🗂 휴지통 목록 조회 (GET /api/mypage/trash)
export const MYPAGE_TRASH_LIST = `${SERVER_HOST}/api/mypage/trash`;
