import { ROLES_AND_PERMISSIONS } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: ROLES_AND_PERMISSIONS,
    lazy: () => import("modules/rolesAndPermissions/pages/RolesAndPermissions"),
  },
] as RouteObject[];
