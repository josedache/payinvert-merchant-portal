import { SETTINGS_USERS, SETTINGS_USERS_SUBSIDIARIES } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: SETTINGS_USERS,
    lazy: () => import("modules/user/pages/UserList"),
  },
  {
    path: SETTINGS_USERS_SUBSIDIARIES,
    lazy: () => import("modules/user/pages/UserSubsidiary"),
  },
] as RouteObject[];
