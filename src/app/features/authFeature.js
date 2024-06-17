import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // loginAction
    loginAction: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Save to local-storage
      localStorage.setItem("jwt", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    // logoutAction action
    logoutAction: (state) => {
      Object.assign(state, initialState);
      localStorage.clear();
    },
    // When user updates their profile
    updateProfileAction: (state, action) => {
      Object.assign(state, action.payload);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { loginAction, logoutAction, updateProfileAction } =
  authSlice.actions;
export default authSlice.reducer;
