import { jwtDecode } from "jwt-decode";
import { apiSlice } from "../../app/apiSlice";
import { User } from "../../app/types";
import { logOut, setCredentials } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentitals) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentitals },
      }),
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
      async onQueryStarted(_arg, { dispatch }) {
        try {
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;

          const user = jwtDecode<User>(accessToken);

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
} = authApiSlice;
