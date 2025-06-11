import axios from "axios";
import { CALENDAR_LIST, CALENDAR_SAVE } from "./_http";

export const getCalendar = async () => {
  try {
    const response = await axios.get(`${CALENDAR_LIST}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postCalendar = async (newSchedule) => {
  try {
    const response = await axios.post(`${CALENDAR_SAVE}`, newSchedule, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // 쿠키를 포함한 요청이 필요하다면 true
    });

    return response.data; // 저장된 일정 객체
  } catch (error) {
    console.error("일정 저장 실패", error);
    throw error; // 상위에서 catch할 수 있도록 에러 던짐
  }
};

export const deleteCalendar = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/calendar/${id}`,
      {
        withCredentials: true, // 필요 시 쿠키 포함
      }
    );
    return response.data; // 서버에서 메시지나 상태 반환 시
  } catch (error) {
    console.error("일정 삭제 실패", error);
    throw error; // 상위에서 catch 가능하게 던지기
  }
};

export const putCalendar = async (id, updatedSchedule) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/calendar/${id}`,
      updatedSchedule,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("일정 수정 실패", error);
    throw error;
  }
};
