import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./store-actions";
import { AuthUser } from "../types/user.ts";
import { subsidiaryApi } from "apis/subsidiary.ts";
import * as dfns from "date-fns";

type InitialState = {
  authUser: AuthUser;
  isSideNavigation: boolean;
  isIconSidebar: boolean;
};

export const initialState: InitialState = {
  authUser: null,
  isSideNavigation: false,
  isIconSidebar: true,
};

export const slice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setAuthUser: (state, { payload }) => {
      state.authUser = payload;
    },
    toggleSideNavigation: (state, { payload }) => {
      state.isSideNavigation =
        payload !== undefined ? !!payload : !state.isSideNavigation;
    },
    toggleIconSidebar: (state, { payload }) => {
      state.isIconSidebar =
        payload !== undefined ? !!payload : !state.isIconSidebar;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(logout, () => ({ ...initialState }))
      .addMatcher(
        subsidiaryApi.endpoints.loginSubsidiary.matchFulfilled,
        (state, { payload }) => {
          const token = payload?.token?.accessToken;
          state.authUser = {
            ...payload,
            activeSubsidiary:
              payload?.activeSubsidiary ??
              payload?.subsidiaryDetails?.subsidiaries?.[0],
            token: token,
            expiresIn: String(dfns.addSeconds(new Date(), 3600)),
            isAuthenticated: !!token,
          } as AuthUser;
        }
      )
      .addMatcher(
        subsidiaryApi.endpoints.completeSubsidiaryLogin.matchFulfilled,
        (state, { payload }) => {
          const token = payload?.token?.accessToken;
          state.authUser = {
            ...state.authUser,
            ...payload,
            activeSubsidiary:
              payload?.activeSubsidiary ??
              payload?.subsidiaryDetails?.subsidiaries?.[0],
            token: token,
            expiresIn: String(dfns.addSeconds(new Date(), 3600)),
            isAuthenticated: !!token,
          } as AuthUser;
        }
      )
      // .addMatcher(
      //   userApi.endpoints.userRefreshToken.matchFulfilled,
      //   (state, { payload }) => {
      //     state.authUser.token = payload.data.token;
      //     state.authUser.refreshToken = payload.data.refreshToken;
      //     state.authUser.expiresIn = String(
      //       addSeconds(new Date(), payload?.data?.login_expiry)
      //     );
      //   }
      // )
      // .addMatcher(
      //   userApi.endpoints.sendUserResetPassword.matchFulfilled,
      //   (state, { payload }) => {
      //     state.authUser = { token: payload?.token };
      //   }
      // )
      // .addMatcher(
      //   userApi.endpoints.verifyUserResetPassword.matchFulfilled,
      //   (state, { payload }) => {
      //     state.authUser.token = payload?.data?.token;
      //   }
      // )
      // .addMatcher(userApi.endpoints.resetPassword.matchFulfilled, (state) => {
      //   state.authUser = null;
      // })
      .addMatcher(
        subsidiaryApi.endpoints.getSubsidiaryMe.matchFulfilled,
        (state, { payload }) => {
          const token = payload?.token?.accessToken;
          state.authUser = {
            ...state.authUser,
            ...payload,
            token: token,
          } as AuthUser;
        }
      ),
  // .addMatcher(
  //   userApi.endpoints.getUserSelfieFile.matchFulfilled,
  //   (state, { payload }) => {
  //     state.authUser.avatar = isBase64DataURL(payload.data)
  //       ? payload.data
  //       : `data:image/png;base64,${payload.data}`;
  //   }
  // ),
});

export const { setAuthUser, toggleIconSidebar } = slice.actions;

export default slice;

export function getStorageState({ authUser }: typeof initialState) {
  return { authUser };
}
