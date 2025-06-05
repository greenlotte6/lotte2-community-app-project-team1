import axios from "axios";
import { INQUIRE_REGISTER } from "./_http";

export const postInquire = async (formData) => {
  try {
    const response = await axios.post(`${INQUIRE_REGISTER}`, formData, {
      withCredentials: true, // 필요 없다면 생략 가능
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
