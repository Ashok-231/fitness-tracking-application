import axios from "axios";

export const getBodyProgress = (userId) => {
  return axios.get(`http://localhost:8080/api/body-progress/${userId}`);
};
