import axios from "axios";

const API = "http://localhost:8080/api/users";

// Save height & weight
export const saveBody = (userId, height, weight) => {
  return axios.put(`${API}/${userId}/body`, {
    height: Number(height),
    weight: Number(weight),
  });
};

// Get current user body profile
export const getUser = (userId) => {
  return axios.get(`${API}/${userId}`);
};

// Get BMI history
export const getBodyHistory = (userId) => {
  return axios.get(`${API}/${userId}/body-history`);
};
