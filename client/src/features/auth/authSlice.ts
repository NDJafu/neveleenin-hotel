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

export default authSlice.reducer;
