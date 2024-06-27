import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "../constants/basic";
import { withToken } from "../utils/api.util";

export const KiSendAPI = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT + "api/",
    prepareHeaders: (headers) => {
      return withToken(headers);
    },
  }),
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
    // Get single user
    getFriend: builder.query({
      query: (userId) => ({
        url: `getFriend/${userId}`,
      }),
      providesTags: (result, error, userId) => [{ ...result, userId }],
    }),
    // Here add friend mutation queries
    addFriend: builder.mutation({
      query: (userId) => ({
        url: `addFriend/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, userId) => [{ ...result, userId }],
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetGlobalUsersQuery,
  useUpdateProfileMutation,
  useAddFriendMutation,
} = KiSendAPI;
