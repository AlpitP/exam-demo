import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { SUCCESS_CODE } from "../../constants";
import { axiosInstance } from "../api";
import { addUserInfo, removeUserInfo } from "../slices/userSlice";
import { toastArray, userArray } from "../../description/api";

const api = createAsyncThunk(
  "api",
  async ({ name, config }, { rejectWithValue, dispatch }) => {
    try {
      const { method, url, data, ...rest } = config;

      const response = await axiosInstance({
        method,
        url,
        data,
        ...rest,
      });
      const { statusCode, message } = response?.data ?? {};
      if (statusCode === 401) {
        dispatch(removeUserInfo());
      }

      if (statusCode !== SUCCESS_CODE) {
        throw new Error(message);
      }

      // if (userArray.includes(name)) {
      //   statusCode === SUCCESS_CODE &&
      //     dispatch(addUserInfo(response?.data?.data));
      // }
      // if (toastArray.includes(name)) {
      //   toast.success(message);
      // }
      return { name, data: response?.data };
    } catch (error) {
      let errorMessage = "Unknown Error Occurred!";

      if (error.response) {
        errorMessage = error.response?.data?.message;
      } else if (error.request) {
        errorMessage = "Network Problem!";
      } else {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      return rejectWithValue({ name, message: errorMessage });
    }
  }
);

export default api;
