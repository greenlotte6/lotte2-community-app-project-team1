import axios from "axios";
import {
  USER_EMAIL_CHECK,
  USER_EMAIL_SEND,
  USER_EMAIL_VALID,
  USER_HP_CHECK,
  USER_ID_CHECK,
  USER_ID_SUCCESS,
  USER_INFO,
  USER_LOGIN,
  USER_LOGOUT,
  USER_MEMBERSHIP_SAVE,
  USER_PASS_MODIFY,
  USER_REGISTER,
  USER_UID_BY_HP,
} from "./_http";

export const postUser = async (data) => {
  try {
    const response = await axios.post(`${USER_REGISTER}`, data, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postUserLogin = async (data) => {
  try {
    const response = await axios.post(`${USER_LOGIN}`, data, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postModifyPass = async (data) => {
  try {
    const response = await axios.post(`${USER_PASS_MODIFY}`, data, {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserLogout = async () => {
  try {
    const response = await axios.get(`${USER_LOGOUT}`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postMemberShip = async (data) => {
  const membership = {
    membership: data,
  };

  try {
    const response = await axios.post(`${USER_MEMBERSHIP_SAVE}`, membership, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 아이디 체크
export const checkId = async (data) => {
  try {
    const response = await axios.get(`${USER_ID_CHECK}?uid=${data.uid}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 아이디 체크
export const checkHp = async (data) => {
  try {
    const response = await axios.get(`${USER_HP_CHECK}?hp=${data}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 아이디 체크 성공 시 세션에 데이터 저장
export const checkIdSuccess = async (data) => {
  try {
    const response = await axios.get(
      `${USER_ID_SUCCESS}?uid=${data.uid}&pass=${data.pass}`,
      {
        withCredentials: true, // ★ 세션 유지 위해 꼭 필요
      }
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 이메일 인증
export const checkEmail = async (data) => {
  try {
    const response = await axios.get(`${USER_EMAIL_CHECK}?email=${data}`, {
      withCredentials: true, // ★ 세션 유지 위해 꼭 필요
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 이메일 인증
export const EmailSend = async (data) => {
  try {
    const response = await axios.get(`${USER_EMAIL_SEND}?email=${data}`, {
      withCredentials: true, // ★ 세션 유지 위해 꼭 필요
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 이메일코드 인증
export const EmailCodeValid = async (data) => {
  try {
    const response = await axios.get(`${USER_EMAIL_VALID}?code=${data}`, {
      withCredentials: true, // ★ 세션 유지 위해 꼭 필요
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 전화번호로 uid 가져오기
export const getUidByHp = async (data) => {
  try {
    const response = await axios.get(`${USER_UID_BY_HP}?hp=${data}`, {
      withCredentials: true, // ★ 세션 유지 위해 꼭 필요
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getInfo = async () => {
  try {
    const response = await axios.get(`${USER_INFO}`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
