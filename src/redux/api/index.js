import axios from "axios";
import { BASE_URL } from "../../constants";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    token && (config.headers["access-token"] = token);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
