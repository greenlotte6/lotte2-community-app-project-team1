// const SERVER_HOST = "http://localhost:8080";

// 베포 테스트
const isLocalhost = window.location.hostname.includes("localhost");
const isHttps = window.location.protocol === "https:";

// 배포 환경 서버 호스트 지정
const SERVER_HOST = isLocalhost ? "http://localhost:8080" : ""; // 운영(프론트/백 분리면 경로 맞춰줘야 함)

const WS_HOST = isLocalhost ? "localhost:8080" : "3.34.124.218:8080";
const HTTP_PROTOCOL = isHttps ? "https" : "http";
const WS_PROTOCOL = isHttps ? "wss" : "ws";

// WebSocket 연결용
export const SOCKET_URL = `${HTTP_PROTOCOL}://${WS_HOST}/ws-chat`;
// 버전 정보
export const VERSION = `${SERVER_HOST}/version`;
// 주석추가
// 카카오 결제
export const KAKAO_CREDIT = `${SERVER_HOST}/api/pay/ready`;

// 소셜 로그인
export const SOCIAL_TOKEN = `${SERVER_HOST}/api/user/me`;
export const SOCIAL_NAVER = `${SERVER_HOST}/oauth2/authorization/naver`;
export const SOCIAL_KAKAO = `${SERVER_HOST}/oauth2/authorization/kakao`;
export const SOCIAL_GOOGLE = `${SERVER_HOST}/oauth2/authorization/google`;

// user
export const USER_REGISTER = `${SERVER_HOST}/user`;
export const USER_LOGIN = `${SERVER_HOST}/user/login`;
export const USER_LOGOUT = `${SERVER_HOST}/user/logout`;
export const USER_THUMB = `${SERVER_HOST}/user/thumb`;
export const USER_MODIFY_INFO = `${SERVER_HOST}/user/modify/info`;

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
export const USER_INFO = `${SERVER_HOST}/user/info`;

// 약관
export const TEMP = `${SERVER_HOST}/user/terms`;

// 사원 초대하기
export const USER_INVITE = `${SERVER_HOST}/user/invite`;
export const USER_INVITE_CODE = (code) =>
  `${SERVER_HOST}/user/invite/check/${code}`;

// 회사 정보 호출
export const COMPANY = {
  DEPARTMENT: {
    LIST: (cno) => `${SERVER_HOST}/api/department/info/${cno}`,
  },
};

// article
export const ARTICLE_WRITE = `${SERVER_HOST}/article`;
export const ARTICLE_LIST = (categoryId, companyId) =>
  `${SERVER_HOST}/api/boards/company/${companyId}/category/${categoryId}`;
export const CATEGORY_LIST = (cno) =>
  `${SERVER_HOST}/api/category/company/${cno}`;

export const CATEGORY_DELETE = (cno) =>
  `${SERVER_HOST}/api/category/delete/${cno}`;

// product
export const PRODUCT_REGISTER = `${SERVER_HOST}/product`;
export const PRODUCT_LIST = `${SERVER_HOST}/product`;
export const PRODUCT_THUMB = `${SERVER_HOST}/product/thumb`;

//문의하기
export const INQUIRE_REGISTER = `${SERVER_HOST}/qna`;

// 소켓 엔드포인트
//export const SOCKET_URL = `${SERVER_SOCKET}/wss-chat`;

// 채팅 REST 엔드포인트 모음
export const API = {
  CHAT: {
    // 채팅방 리스트(GET)
    ROOM_LIST: (userId) => `${SERVER_HOST}/api/chat/rooms/${userId}`,
    // 채팅방 생성(POST)
    CREATE_ROOM: `${SERVER_HOST}/api/chat/rooms`,
    // 채팅방 삭제(DELETE)
    DELETE_ROOM: (roomId) => `${SERVER_HOST}/api/chat/rooms/${roomId}`,
    // 채팅방 채팅 정보(GET)
    ROOM_DETAIL: (roomId) => `${SERVER_HOST}/api/chat/rooms/select/${roomId}`,
    // 회사별 유저 리스트(GET)
    USER_LIST: (company) =>
      `${SERVER_HOST}/api/chat/users/by-company/${company}`,
    // 읽지 않은 채팅 수 초기화(POST)
    MARK_READ: (roomId) => `${SERVER_HOST}/api/chat/rooms/${roomId}/read`,
    // 채팅방 이름 변경(PUT)
    UPDATE_ROOM_NAME: (roomId) =>
      `${SERVER_HOST}/api/chat/rooms/${roomId}/name`,
    // 채팅방 권한 이동
    GRANT_ADMIN: (roomId) => `${SERVER_HOST}/api/chat/rooms/${roomId}/admin`,
  },
};

// 캘린더
export const CALENDAR = `${SERVER_HOST}/api/calendar`;
export const CALENDAR_TODAY = `${SERVER_HOST}/api/calendar/my/today`;

// Board 게시판
export const BOARD = `${SERVER_HOST}/api/boards`;

// MyPage API

// 저장 (POST /api/mypage/save)
export const MYPAGE_SAVE = `${SERVER_HOST}/api/mypage/save`;
// 전체 목록 (GET /api/mypage/list)
export const MYPAGE_LIST = (userId) =>
  `${SERVER_HOST}/api/mypage/list/${userId}`;
// 🗑 휴지통으로 이동 (PUT /api/mypage/trash/{id})
export const MYPAGE_SOFT_DELETE = (id) =>
  `${SERVER_HOST}/api/mypage/trash/${id}`;
// ♻️ 복원 (PUT /api/mypage/restore/{id})
export const MYPAGE_RESTORE = (id) => `${SERVER_HOST}/api/mypage/restore/${id}`;
// ❌ 영구 삭제 (DELETE /api/mypage/delete/{id})
export const MYPAGE_DELETE = (id) => `${SERVER_HOST}/api/mypage/delete/${id}`;
// 🗂 휴지통 목록 조회 (GET /api/mypage/trash)
export const MYPAGE_TRASH_LIST = (userId) =>
  `${SERVER_HOST}/api/mypage/trash/${userId}`;
// 🗂 휴지통 목록 조회 (GET /api/mypage/trash)
export const MYPAGE_FAVORITES_LIST = (userId) =>
  `${SERVER_HOST}/api/mypage/favorites/${userId}`;
// 공유하기
export const MYPAGE_SHARE = `${SERVER_HOST}/api/mypage/share`;
// 유저그룹
export const MYPAGE_GROUP = `${SERVER_HOST}/api/user/department-groups`;
// 공유페이지
export const MYPAGE_SHARED_PAGE = (userId) =>
  `${SERVER_HOST}/api/mypage/share/received/${userId}`;

// 드라이브
export const DRIVE_API = {
  LIST: `${SERVER_HOST}/api/drive`, // 전체 파일 목록
  UPLOAD: `${SERVER_HOST}/api/drive/upload`, // 파일 업로드
  DOWNLOAD: (id) => `${SERVER_HOST}/api/drive/${id}/download`, // 파일 다운로드
  FAVORITE: (id) => `${SERVER_HOST}/api/drive/${id}/favorite`, // 즐겨찾기 토글
  RENAME: (id) => `${SERVER_HOST}/api/drive/${id}/rename`, // 파일 이름 변경
  DELETE: (id) => `${SERVER_HOST}/api/drive/${id}`, // 휴지통으로 이동
  DELETE_LIST: `${SERVER_HOST}/api/drive/trash`, // 휴지통 리스트 출력
  CREATE_FOLDER: `${SERVER_HOST}/api/drive/folder`,
  RESTORE: (id) => `${SERVER_HOST}/api/drive/${id}/restore`,
  PERMANENT_DELETE: (id) => `${SERVER_HOST}/api/drive/${id}/delete`,
  MOVE_TO_SHARED: (id) => `${SERVER_HOST}/api/drive/${id}/move-to-shared`, // 공유드라이브 이동
  // ✅ 최근 드라이브 관련
  RECENT_LIST: `${SERVER_HOST}/api/drive/recent`,
  RECENT_VIEW: (id) => `${SERVER_HOST}/api/drive/view/${id}`,
};

//Project
export const PROJECT = {
  // 프로젝트 생성 (POST)
  CREATE: `${SERVER_HOST}/api/projects`,
  // 내 프로젝트 리스트 조회 (GET, ?userId=xxx)
  LIST: (userId) => `${SERVER_HOST}/api/projects/my?userId=${userId}`,
  // 프로젝트 상세 조회 (GET)
  DETAIL: (projectId) => `${SERVER_HOST}/api/projects/${projectId}`,

  // 프로젝트 수정 (PUT)
  UPDATE: (projectId) => `${SERVER_HOST}/api/projects/${projectId}`,
  // 프로젝트 삭제 (DELETE)
  DELETE: (projectId) => `${SERVER_HOST}/api/projects/${projectId}`,
};
export const SECTION = {
  // 특정 프로젝트의 섹션 목록 (GET)
  LIST: (projectId) => `${SERVER_HOST}/api/projects/${projectId}/sections`,
  // 섹션 생성 (POST)
  CREATE: (projectId) => `${SERVER_HOST}/api/projects/${projectId}/sections`,
  // 섹션 수정 (PUT)
  UPDATE: (sectionId) => `${SERVER_HOST}/api/sections/${sectionId}`,
  // 섹션 삭제 (DELETE)
  DELETE: (sectionId) => `${SERVER_HOST}/api/sections/${sectionId}`,
  BULK_SAVE: (projectId) =>
    `${SERVER_HOST}/api/projects/${projectId}/sections/bulk`,
};
export const TASK = {
  // 특정 섹션의 태스크 목록 (GET)
  LIST: (sectionId) => `${SERVER_HOST}/api/sections/${sectionId}/tasks`,
  // 태스크 생성 (POST)
  CREATE: (sectionId) => `${SERVER_HOST}/api/sections/${sectionId}/tasks`,
  // 태스크 수정 (PUT)
  UPDATE: (taskId) => `${SERVER_HOST}/api/tasks/${taskId}`,
  // 태스크 삭제 (DELETE)
  DELETE: (taskId) => `${SERVER_HOST}/api/tasks/${taskId}`,
};
export const PROJECT_MEMBER = {
  // 프로젝트 멤버 리스트 (GET)
  LIST: (projectId) => `${SERVER_HOST}/api/projects/${projectId}/members`,
  // 멤버 추가 (POST)
  ADD: (projectId) => `${SERVER_HOST}/api/projects/${projectId}/members`,
  // 멤버 삭제 (DELETE)
  REMOVE: (projectId, userId) =>
    `${SERVER_HOST}/api/projects/${projectId}/members/${userId}`,
  // 권한 변경 (PUT)
  UPDATE_ROLE: (projectId, userId) =>
    `${SERVER_HOST}/api/projects/${projectId}/members/${userId}/role`,
};
