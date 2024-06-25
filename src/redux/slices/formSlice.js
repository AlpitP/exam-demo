import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {},
  error: {},
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    onChange: (state, action) => {
      const { name, value, data } = action.payload;
      data
        ? (state.formData = { ...state.formData, ...data })
        : (state.formData[name] = value);
    },
    setError: (state, action) => {
      const { name, error } = action.payload;
      state.error[name] = error;
    },
    removeError: (state, action) => {
      const { name } = action.payload;
      delete state.error[name];
    },
    clearForm: () => {
      return initialState;
    },
  },
});

export const { onChange, setError, clearForm, removeError } = formSlice.actions;
export default formSlice.reducer;
