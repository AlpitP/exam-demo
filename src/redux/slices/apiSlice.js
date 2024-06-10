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
        state.loading = true;
        state.error = "";
      })

      .addCase(api.fulfilled, (state, action) => {
        const { data } = action?.payload?.data;

        state.loading = false;
        state.data = data;
        state.error = "";
      })

      .addCase(api.rejected, (state, action) => {
        const { message } = action?.payload?.data;

        state.loading = false;
        state.error = message;
      });
  },
});

export default apiSlice.reducer;
