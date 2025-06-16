// 📁 mypageApi.js
import axios from "axios";
import {
  MYPAGE_SAVE,
  MYPAGE_LIST,
  MYPAGE_DELETE,
  MYPAGE_TRASH_LIST,
  MYPAGE_SOFT_DELETE,
  MYPAGE_RESTORE,
  MYPAGE_FAVORITES_LIST,
  MYPAGE_SHARE,
} from "./_http";

// 저장
export const saveMyPage = async (data) => {
  try {
    const response = await axios.post(MYPAGE_SAVE, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 삭제 (영구 삭제)
export const deleteMyPage = async (id) => {
  try {
    const response = await axios.delete(MYPAGE_DELETE(id), {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 휴지통으로 이동 (soft delete)
export const softDeleteMyPage = async (id) => {
  try {
    const response = await axios.put(MYPAGE_SOFT_DELETE(id), null, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// 휴지통에서 복원
export const restoreMyPage = async (id) => {
  try {
    const response = await axios.put(MYPAGE_RESTORE(id), null, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// myPageAPI.js
export const fetchAllPagesByUser = async (userId) => {
  const res = await axios.get(MYPAGE_LIST(userId), { withCredentials: true });
  return res.data;
};
export const fetchTrashPagesByUser = async (userId) => {
  const res = await axios.get(MYPAGE_TRASH_LIST(userId), {
    withCredentials: true,
  });
  return res.data;
};
export const fetchFavoritesPagesByUser = async (userId) => {
  const res = await axios.get(MYPAGE_FAVORITES_LIST(userId), {
    withCredentials: true,
  });
  return res.data;
};

// 공유하기
export const shareMyPage = async ({ mypageId, targetUserIds, sharedBy }) => {
  try {
    const response = await axios.post(
      MYPAGE_SHARE,
      { mypageId, targetUserIds, sharedBy },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err; // 실패시 프론트에서 핸들링할 수 있게
  }
};
