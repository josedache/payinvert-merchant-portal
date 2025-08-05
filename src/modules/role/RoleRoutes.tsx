import { ROLES_AND_PERMISSION } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: ROLES_AND_PERMISSION,
    lazy: () => import("modules/role/pages/Role"),
  },
] as RouteObject[];
