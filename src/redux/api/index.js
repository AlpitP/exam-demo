import axios from "axios";
import { BASE_URL } from "../../constants";
import { getLocalStorage } from "../../utils/javascript";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("token");
    token && (config.headers["access-token"] = token);

    return config;
  },
  (error) => Promise.reject(error)
);
