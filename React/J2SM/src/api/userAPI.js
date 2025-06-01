import axios from "axios";
import {
  USER_ID_CHECK,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_TERMS,
} from "./_http";

export const getTerms = async () => {
  try {
    const response = await axios.get(`${USER_TERMS}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postUser = async (data) => {
  try {
    const response = await axios.post(`${USER_REGISTER}`, data);
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

// 아이디 체크
export const checkId = async (data) => {
  try {
    const response = await axios.get(`${USER_ID_CHECK}`, data);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
