import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {},
    error: {},
  },
  reducers: {
    onChange: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    setError: (state, action) => {
      const { name, error } = action.payload;
      state.error[name] = error;
    },
    clearForm: (state) => {
      state.formData = {};
      state.error = {};
    },
  },
});

export const { onChange, setError, clearForm } = formSlice.actions;
export default formSlice.reducer;
