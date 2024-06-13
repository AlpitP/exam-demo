import { createSlice } from "@reduxjs/toolkit";
import api from "../actions/apiAction";

const initialState = {
  data: {},
  loading: {},
  error: {},
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(api.pending, (state, action) => {
        const { name } = action.meta.arg;
        state.loading[name] = true;
        state.error[name] = "";
      })

      .addCase(api.fulfilled, (state, action) => {
        const { data, name } = action?.payload;

        state.loading[name] = false;
        state.data[name] = data?.data;
        state.error[name] = "";
      })

      .addCase(api.rejected, (state, action) => {
        const { message, name } = action?.payload;

        state.loading[name] = false;
        state.error[name] = message;
      });
  },
});

export default apiSlice.reducer;
