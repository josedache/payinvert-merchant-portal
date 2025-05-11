import {
  SIGNIN,
  SIGNUP,
  SIGNIN_2FA,
  PASSWORD_RESET,
  SIGNUP_VERIFY,
} from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: SIGNUP,
    lazy: () => import("modules/auth/pages/AuthSignup"),
  },
  {
    path: SIGNUP_VERIFY,
    lazy: () => import("modules/auth/pages/AuthSignupVerification"),
  },
  {
    path: SIGNIN,
    lazy: () => import("modules/auth/pages/AuthSignin"),
  },
  {
    path: SIGNIN_2FA,
    lazy: () => import("modules/auth/pages/AuthSignin2fa"),
  },
  {
    path: PASSWORD_RESET,
    lazy: () => import("modules/auth/pages/AuthPasswordReset"),
  },
] as RouteObject[];
