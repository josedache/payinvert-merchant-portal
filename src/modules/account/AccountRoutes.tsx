import { ACCOUNT } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: ACCOUNT,
    lazy: () => import("modules/account/pages/Account"),
  },
] as RouteObject[];
