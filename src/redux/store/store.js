import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../slices/formSlice";
import toastSlice from "../slices/toastSlice";
import apiSlice from "../slices/apiSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
  reducer: {
    formData: formReducer,
    toast: toastSlice,
    api: apiSlice,
    user: userSlice,
  },
});
export default store;
