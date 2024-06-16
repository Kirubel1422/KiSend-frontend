import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: null,
  error: null,
  globalUsers: [],
  friends: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setGlobalUsers: (state, action) => {
      state.globalUsers = action.payload;
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    setError: (state, action) => {
      state.error = action.error;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    reset: (state) => {
      Object.assign(state, initialState); // assign original state
    },
  },
});

export const { setGlobalUsers, setFriends, setError, setLoading, reset } =
  usersSlice.actions;
export default usersSlice.reducer;
