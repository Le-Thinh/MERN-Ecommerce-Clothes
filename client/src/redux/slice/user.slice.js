"use strict";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload;
    },
    verifyEmail: (state, action) => {},
    login: (state, action) => {},
    logout: (state, action) => {},
  },
});

export const { signUp, verifyEmail, login, logout } = userSlice.actions;

export default userSlice.reducer;
