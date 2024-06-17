import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "../constants/basic";

export const KiSendAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT + "api/" }),
  tagTypes: ["Global", "Friends"],
  endpoints: (builder) => ({
    // Update user profile
    updateProfile: builder.mutation({
      query: (body) => ({
        method: "PATCH",
        body,
        url: "updateProfile",
      }),
    }),
    // Fetch all users
    getGlobalUsers: builder.query({
      query: () => "getGlobalUsers",
      providesTags: ["Global"],
    }),
    // Fetching friends only
    getFriends: builder.query({
      query: () => "getFriends",
      providesTags: ["Friends"],
    }),
    // Here add mutation queries
  }),
});

export const {
  useGetFriendsQuery,
  useGetGlobalUsersQuery,
  useUpdateProfileMutation,
} = KiSendAPI;
