import axios from "axios";

export const getProgress = (userId) => {
  return axios.get(`http://localhost:8080/api/progress/user/${userId}`);
};
