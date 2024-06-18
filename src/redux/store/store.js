import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../slices/apiSlice";
import formReducer from "../slices/formSlice";
import toastSlice from "../slices/toastSlice";
import userSlice from "../slices/userSlice";
import teacherSlice from "../slices/teacherSlice";
import studentSlice from "../slices/studentSlice";

const store = configureStore({
  reducer: {
    formData: formReducer,
    toast: toastSlice,
    api: apiSlice,
    user: userSlice,
    teacher: teacherSlice,
    student: studentSlice,
  },
});

export default store;
