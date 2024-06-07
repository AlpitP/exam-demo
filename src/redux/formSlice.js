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
  },
});

export const { onChange } = formSlice.actions;
export default formSlice.reducer;
