import axios from "axios";
import { VERSION } from "./_http";

export const getVersion = async () => {
  try {
    const response = await axios.get(`${VERSION}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
