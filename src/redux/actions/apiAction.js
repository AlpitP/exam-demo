import { createAsyncThunk } from "@reduxjs/toolkit";
import { SUCCESS_CODE } from "../../constants";
import { axiosInstance } from "../api";
import { showToast } from "../slices/toastSlice";
import { addUserInfo } from "../slices/userSlice";

const api = createAsyncThunk(
  "api",
  async ({ name, config, toast = true }, { rejectWithValue, dispatch }) => {
    try {
      const { method, url, data, ...rest } = config;

      const response = await axiosInstance({
        method,
        url,
        data,
        ...rest,
      });

      const { statusCode, message } = response?.data ?? {};

      if (statusCode !== SUCCESS_CODE) {
        throw new Error(message);
      }

      if (["signIn", "signUp"].includes(name)) {
        statusCode === SUCCESS_CODE &&
          dispatch(addUserInfo(response?.data?.data));
      }

      toast && dispatch(showToast({ type: "success", message: message }));
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
      dispatch(showToast({ type: "error", message: errorMessage }));
      return rejectWithValue({ name, message: errorMessage });
    }
  }
);

export default api;
