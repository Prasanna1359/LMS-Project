
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/AdminUrls"; 

export const loginApi = async (userData) => {
  return axios.post(`${API_BASE_URL}/AdminLogin/`, userData);
};
