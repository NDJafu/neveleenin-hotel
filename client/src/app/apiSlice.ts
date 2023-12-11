import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { logOut, setCredentials } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { User } from "./types";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    console.log("sending refresh token");

    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    console.log(refreshResult);

    if (refreshResult?.data) {
      const state = api.getState() as RootState;
      const user = state.auth.currentUser;

      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentitals) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentitals },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data as unknown as { accessToken: string };

          const user = jwtDecode<User>(accessToken);

          dispatch(setCredentials({ user, accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;

          const user = jwtDecode<User>(accessToken);
          console.log(user);

          dispatch(setCredentials({ user, accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
} = apiSlice;
