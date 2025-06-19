import axios from "axios";
import { PROJECT, SECTION, TASK, PROJECT_MEMBER } from "./_http";

// ----------- 프로젝트 -----------
export const createProject = async (data) => {
  try {
    const res = await axios.post(PROJECT.CREATE, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("createProject error:", err);
    throw err;
  }
};

export const fetchMyProjects = async (userId) => {
  try {
    const res = await axios.get(PROJECT.LIST(userId), {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("fetchMyProjects error:", err);
    throw err;
  }
};

export const fetchProjectDetail = async (projectId) => {
  try {
    const res = await axios.get(PROJECT.DETAIL(projectId), {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("fetchProjectDetail error:", err);
    throw err;
  }
};

export const updateProject = async (projectId, data) => {
  try {
    const res = await axios.put(PROJECT.UPDATE(projectId), data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("updateProject error:", err);
    throw err;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const res = await axios.delete(PROJECT.DELETE(projectId), {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("deleteProject error:", err);
    throw err;
  }
};

// ----------- 섹션(Section) -----------
export const fetchSections = async (projectId) => {
  try {
    const res = await axios.get(SECTION.LIST(projectId), {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("fetchSections error:", err);
    throw err;
  }
};

export const createSection = async (projectId, data) => {
  try {
    const res = await axios.post(SECTION.CREATE(projectId), data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("createSection error:", err);
    throw err;
  }
};

export const updateSection = async (sectionId, data) => {
  try {
    const res = await axios.put(SECTION.UPDATE(sectionId), data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("updateSection error:", err);
    throw err;
  }
};

export const deleteSection = async (sectionId) => {
  try {
    const res = await axios.delete(SECTION.DELETE(sectionId), {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("deleteSection error:", err);
    throw err;
  }
};

// ----------- 태스크(Task) -----------
export const fetchTasks = async (sectionId) => {
  try {
    const res = await axios.get(TASK.LIST(sectionId), {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("fetchTasks error:", err);
    throw err;
  }
};

export const createTask = async (sectionId, data) => {
  try {
    const res = await axios.post(TASK.CREATE(sectionId), data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("createTask error:", err);
    throw err;
  }
};

export const updateTask = async (taskId, data) => {
  try {
    const res = await axios.put(TASK.UPDATE(taskId), data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("updateTask error:", err);
    throw err;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await axios.delete(TASK.DELETE(taskId), {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("deleteTask error:", err);
    throw err;
  }
};

// ----------- 프로젝트 멤버 -----------
export const fetchProjectMembers = async (projectId) => {
  try {
    const res = await axios.get(PROJECT_MEMBER.LIST(projectId), {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("fetchProjectMembers error:", err);
    throw err;
  }
};

export const addProjectMember = async (projectId, { userUid, role }) => {
  try {
    const res = await axios.post(PROJECT_MEMBER.ADD(projectId), null, {
      params: { userUid, role },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("addProjectMember error:", err);
    throw err;
  }
};

export const removeProjectMember = async (projectId, userId) => {
  try {
    const res = await axios.delete(PROJECT_MEMBER.REMOVE(projectId, userId), {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("removeProjectMember error:", err);
    throw err;
  }
};

export const updateProjectMemberRole = async (projectId, memberId, newRole) => {
  try {
    const res = await axios.put(
      PROJECT_MEMBER.UPDATE_ROLE(projectId, memberId),
      null,
      { params: { newRole }, withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("updateProjectMemberRole error:", err);
    throw err;
  }
};
