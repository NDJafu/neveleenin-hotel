import { jwtDecode } from "jwt-decode";
import { apiSlice } from "../../app/apiSlice";
import { User } from "../../app/types";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  currentUser: User | null;
  token: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  token: null,
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

//RTK Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.currentUser = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
  authApiSlice;

export default authSlice.reducer;
