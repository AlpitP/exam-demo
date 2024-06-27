import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { SUCCESS_CODE } from "../../constants";
import { axiosInstance } from "../api";
import { removeUser } from "../slices/userSlice";

const api = createAsyncThunk(
  "api",
  async ({ name, config }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance(config);
      const { statusCode, message } = response?.data ?? {};
      if (statusCode === 401) {
        dispatch(removeUser());
      }

      if (statusCode !== SUCCESS_CODE) {
        throw new Error(message);
      }
      return { name, data: response?.data };
    } catch (error) {
      let errorMessage = "Unknown Error Occurred!";

      if (error.response) {
        errorMessage = error.response?.data?.message;
      } else {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      return rejectWithValue({ name, message: errorMessage });
    }
  }
);

export default api;
