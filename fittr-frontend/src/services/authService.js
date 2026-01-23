import axios from "axios";

const AUTH_API = "http://localhost:8080/api/auth";

export const login = (email, password) => {
  return axios.post(`${AUTH_API}/login`, {
    email,
    password
  });
};

export const register = (user) => {
  return axios.post(`${AUTH_API}/register`, user);
};


