const SERVER_HOST = "http://localhost:8080";

// user
export const USER_TERMS = `${SERVER_HOST}/terms`;
export const USER_REGISTER = `${SERVER_HOST}/user`;
export const USER_LOGIN = `${SERVER_HOST}/user/login`;
export const USER_LOGOUT = `${SERVER_HOST}/user/logout`;

// 유저 아이디 체크
export const USER_ID_CHECK = `${SERVER_HOST}/user/idCheck`;
export const USER_ID_SUCCESS = `${SERVER_HOST}/user/idCheck/success`;
export const USER_EMAIL_CHECK = `${SERVER_HOST}/user/emailCheck`;
export const USER_EMAIL_SEND = `${SERVER_HOST}/user/emailSend`;
export const USER_EMAIL_VALID = `${SERVER_HOST}/user/emailCodeValid`;

// article
export const ARTICLE_WRITE = `${SERVER_HOST}/article`;
export const ARTICLE_LIST = `${SERVER_HOST}/article`;

// product
export const PRODUCT_REGISTER = `${SERVER_HOST}/product`;
export const PRODUCT_LIST = `${SERVER_HOST}/product`;
export const PRODUCT_THUMB = `${SERVER_HOST}/product/thumb`;
