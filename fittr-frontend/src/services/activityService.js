import axios from "axios";

const API_URL = "http://localhost:8080/api/activities";

/* ===============================
   🔹 Get all activities of a user
=============================== */
export const getActivities = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

/* ===============================
   🔹 Add new activity
=============================== */
export const addActivity = (activity, userId) => {
  return axios.post(`${API_URL}/user/${userId}`, activity);
};

/* ===============================
   🔥 Delete activity
=============================== */
export const deleteActivity = (userId, activityId) => {
  return axios.delete(`${API_URL}/user/${userId}/${activityId}`);
};

/* ===============================
   🔥 Get weekly progress
=============================== */
export const getWeeklyProgress = (userId) => {
  return axios.get(`${API_URL}/user/${userId}/weekly`);
};

/* ===============================
   🔥 FILTER ACTIVITIES (NEW)
   Supports:
   - date
   - categoryId
   - date range
   - category + date range
=============================== */
export const filterActivities = (params) => {
  return axios.get(`${API_URL}/filter`, {
    params
  });
};


