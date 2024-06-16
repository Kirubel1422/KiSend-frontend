import { configureStore } from "@reduxjs/toolkit";
import { KiSendAPI } from "../api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import rootReducer from "./rootReducers";
import { authApi } from "../api/authSlice";

// Configuring store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      KiSendAPI.middleware,
      authApi.middleware
    );
  },
});

// For refetch and other functionallities
setupListeners(store.dispatch);
