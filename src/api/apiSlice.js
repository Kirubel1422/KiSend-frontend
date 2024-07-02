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
  tagTypes: ["Global", "Friends", "Friend", "Followers"],
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
      providesTags: (returnValue, err, args) => {
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
      providesTags: (returnValue, err, args) => [
        ...returnValue.users.map((user) => ({ type: "Friends", id: user.id })),
      ],
    }),
    // Get single user
    getFriend: builder.query({
      query: (userId) => ({
        url: `getFriend/${userId}`,
      }),
      providesTags: (returnValue, err, args) => [{ type: "Friend", id: args }],
    }),
    // Here add friend mutation queries - follow User
    addFriend: builder.mutation({
      query: (userId) => ({
        url: `followUser/${userId}`,
        method: "POST",
      }),
      invalidatesTags: () => {
        return [{ type: "Global", id: "GlobalFriendsList" }];
      },
    }),

    // Get all followers
    getAllFollowers: builder.query({
      query: () => ({
        url: `getAllFollowers`,
        method: "GET",
      }),
      providesTags: (returnValue, err, args) => [
        ...returnValue.followers.map((item) => ({
          type: "Followers",
          id: item.id,
        })),
      ],
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetGlobalUsersQuery,
  useUpdateProfileMutation,
  useAddFriendMutation,
  useGetAllFollowersQuery,
} = KiSendAPI;
