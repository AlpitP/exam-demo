import { createAsyncThunk } from "@reduxjs/toolkit";
import { SUCCESS_CODE } from "../../constants";
import { capitalize } from "../../utils/javascript";
import { showToast } from "../slices/toastSlice";
import { axiosInstance } from "../api";
import { addUserInfo } from "../slices/userSlice";

const api = createAsyncThunk(
  "api",
  async (
    { name, config, toast = true },
    { rejectWithValue, dispatch, signal }
  ) => {
    try {
      const { method, url, params = {}, data, ...rest } = config;

      const response = await axiosInstance({
        method,
        url,
        params,
        data,
        signal,
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

      toast &&
        dispatch(showToast({ type: "success", message: capitalize(message) }));
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

      dispatch(showToast({ type: "error", message: capitalize(errorMessage) }));
      return rejectWithValue({ name, message: errorMessage });
    }
  }
);

export default api;
