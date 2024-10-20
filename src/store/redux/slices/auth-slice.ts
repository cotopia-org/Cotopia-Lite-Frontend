import { _BUS } from "@/app/const/bus";
import { __VARS } from "@/app/const/vars";
import { UserType } from "@/types/user";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type InitialStateType = {
  user?: UserType;
  token?: string;
};

const initialState: InitialStateType = {
  user: undefined,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth-slice",
  initialState: initialState,
  reducers: {
    storeSession: (
      state,
      action: PayloadAction<{ user: UserType; token: string }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logoutSession: (state) => {
      state.token = undefined;
      state.user = undefined;
    },
  },
});

export const { storeSession: storeSessionAction, logoutSession } =
  authSlice.actions;

export default authSlice.reducer;
