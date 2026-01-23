import axios from "axios";

const API_URL = "http://localhost:8080/api/categories";

export const getCategories = () => {
    return axios.get(API_URL);
};

