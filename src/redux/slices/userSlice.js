import { createSlice } from "@reduxjs/toolkit";
import {
  addUserLocalStorage,
  getStateFromLocalStorage,
  removeUserLocalStorage,
  setLoggedIn,
  setLoggedOut,
} from "../../utils/authentication";

const initialState = getStateFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      const { name, role, token } = action.payload;

      token && setLoggedIn();
      addUserLocalStorage({
        name,
        role,
        token,
      });

      return getStateFromLocalStorage();
    },

    removeUserInfo: (state, action) => {
      setLoggedOut();
      removeUserLocalStorage("token", "name", "role");

      return getStateFromLocalStorage();
    },
  },
});

export default userSlice.reducer;
export const { addUserInfo, removeUserInfo } = userSlice.actions;
