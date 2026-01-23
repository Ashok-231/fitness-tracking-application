import axios from "axios";

const AUTH_API = "http://localhost:8080/api/auth";
const USER_API = "http://localhost:8080/api/users";

/* ===============================
   🔐 AUTH
=============================== */

/**
 * Register new user
 */
export const registerUser = (userData) => {
  return axios.post(`${AUTH_API}/register`, {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    gender: userData.gender,
    dob: userData.dob,
    goal: userData.goal
  });
};

/**
 * Login user
 */
export const loginUser = (credentials) => {
  return axios.post(`${AUTH_API}/login`, credentials);
};

/* ===============================
   👤 USER PROFILE
=============================== */

/**
 * Get current user profile
 * (includes height, weight, bmi, gender, goal, etc.)
 */
export const getUser = (userId) => {
  return axios.get(`${USER_API}/${userId}`);
};

/* ===============================
   🧍 BODY PROFILE
=============================== */

/**
 * Save / Update Body Profile
 * Backend: PUT /api/users/{id}/body
 */
export const saveBody = (userId, bodyData) => {
  return axios.put(`${USER_API}/${userId}/body`, {
    height: Number(bodyData.height),
    weight: Number(bodyData.weight)
  });
};

/**
 * Get BMI / body progress history
 */
export const getBodyHistory = (userId) => {
  return axios.get(`${USER_API}/${userId}/body-history`);
};
