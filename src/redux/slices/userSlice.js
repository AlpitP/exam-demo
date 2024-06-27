import { createSlice } from "@reduxjs/toolkit";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setLoggedIn,
  setLoggedOut,
} from "../../utils/authentication";

const initialState = getUserFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, role, token } = action.payload ?? {};

      token && setLoggedIn();
      addUserToLocalStorage({ name, role, token });
      return getUserFromLocalStorage();
    },

    removeUser: () => {
      setLoggedOut();
      removeUserFromLocalStorage("token", "name", "role");
      return getUserFromLocalStorage();
    },
  },
});

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
