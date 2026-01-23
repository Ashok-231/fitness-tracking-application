import axios from "axios";

const API_URL = "http://localhost:8080/api/goals";

// Get goals of logged-in user
export const getGoals = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

// Add new goal for user
export const addGoal = (userId, goal) => {
  return axios.post(`${API_URL}/user/${userId}`, goal);
};

// Delete goal
export const deleteGoal = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// 🔥 Get goal progress %
export const getGoalProgress = (goalId) => {
  return axios.get(`${API_URL}/${goalId}/progress`);
};



