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
  tagTypes: ["Global", "Friends", "Friend"],
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
      providesTags: (returnValue, args) => {
        return [
          { type: "Global", id: "GlobalFriendsList" },
          ...returnValue.users.map((user) => ({
            type: "Global",
            id: user.id,
          })),
        ];
      },
    }),
    // Fetching friends only
    getFriends: builder.query({
      query: () => "getFriends",
      providesTags: (returnValue, args) => [
        ...returnValue.users.map((user) => ({ type: "Friends", id: user.id })),
      ],
    }),
    // Get single user
    getFriend: builder.query({
      query: (userId) => ({
        url: `getFriend/${userId}`,
      }),
      providesTags: (returnValue, args) => [
        { type: "Friend", id: returnValue.user.id },
      ],
    }),
    // Here add friend mutation queries
    addFriend: builder.mutation({
      query: (userId) => ({
        url: `addFriend/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: (returnValue, args) => [{ type: "Friend", id: args }],
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetGlobalUsersQuery,
  useUpdateProfileMutation,
  useAddFriendMutation,
} = KiSendAPI;
