import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/javascript";
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
      const { id, name, role, token } = action.payload;

      token && setLoggedIn();
      addUserLocalStorage({
        id: id ? id : getLocalStorage("id"),
        name,
        role,
        token,
      });

      return getStateFromLocalStorage();
    },

    removeUserInfo: (state, action) => {
      setLoggedOut();
      removeUserLocalStorage("id", "token", "name", "role");

      return getStateFromLocalStorage();
    },
  },
});

export default userSlice.reducer;
export const { addUserInfo, removeUserInfo } = userSlice.actions;
