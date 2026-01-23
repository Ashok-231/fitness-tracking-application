import axios from "axios";

const API_URL = "http://localhost:8080/api/workouts";

export const getWorkoutsByUser = (userId) =>
  axios.get(`${API_URL}/user/${userId}`);
