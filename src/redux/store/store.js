import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../slices/apiSlice";
import formReducer from "../slices/formSlice";
import toastSlice from "../slices/toastSlice";
import userSlice from "../slices/userSlice";
import teacherSlice from "../slices/teacherSlice";

const store = configureStore({
  reducer: {
    formData: formReducer,
    toast: toastSlice,
    api: apiSlice,
    user: userSlice,
    teacher: teacherSlice,
  },
});
export default store;
