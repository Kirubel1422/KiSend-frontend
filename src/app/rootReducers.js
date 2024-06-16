import { combineReducers } from "@reduxjs/toolkit";
import { KiSendAPI } from "../api/apiSlice";
import { authApi } from "../api/authSlice";
import auth from "./features/authFeature";
import users from "./features/usersFeatures";

const rootReducer = combineReducers({
  [KiSendAPI.reducerPath]: KiSendAPI.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth,
  users,
});

export default rootReducer;
