import { DASHBOARD } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: DASHBOARD,
    lazy: () => import("modules/dashboard/pages/Dashboard"),
  },
  // {
  //   path: COMPLIANCE_UPDATE,
  //   lazy: () => import("modules/dashboard/pages/DashboardOnboarding"),
  // },
] as RouteObject[];
