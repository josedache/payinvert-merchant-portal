import { DASHBOARD, DASHBOARD_ONBOARDING } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: DASHBOARD,
    lazy: () => import("modules/dashboard/pages/Dashboard"),
  },
  {
    path: DASHBOARD_ONBOARDING,
    lazy: () => import("modules/dashboard/pages/DashboardOnboarding"),
  },
] as RouteObject[];
