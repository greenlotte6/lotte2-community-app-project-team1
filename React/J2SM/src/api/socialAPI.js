import axios from "axios";
import { SOCIAL_GOOGLE, SOCIAL_KAKAO, SOCIAL_NAVER } from "./_http";

export const getNaver = async () => {
  try {
    const response = await axios.get(`${SOCIAL_NAVER}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getGoogle = async () => {
  try {
    const response = await axios.get(`${SOCIAL_GOOGLE}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getKako = async () => {
  try {
    const response = await axios.get(`${SOCIAL_KAKAO}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
