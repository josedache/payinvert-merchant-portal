import AppErrorBoundary from "./AppErrorBoundary";
import AuthRoutes from "modules/auth/AuthRoutes";
import DashboardRoutes from "modules/dashboard/DashboardRoutes";
import { createBrowserRouter } from "react-router-dom";
import * as urlConstants from "constants/urls";
import SettingsRoutes from "modules/settings/SettingsRoutes";
import AccountRoutes from "modules/account/AccountRoutes";
import BusinessRoutes from "modules/business/BusinessRoutes";

const router = createBrowserRouter([
  {
    path: urlConstants.ENTRY,
    lazy: () => import("./App"),
    ErrorBoundary: AppErrorBoundary,
    children: [
      {
        lazy: () => import("./AppPublic"),
        children: [
          {
            lazy: () => import("./modules/auth/Auth"),
            children: AuthRoutes,
          },
        ],
      },
      {
        lazy: () => import("./AppProtected"),
        children: [
          {
            lazy: () => import("./AppProtectedWithNavigation"),
            children: [
              {
                path: urlConstants.DASHBOARD,
                lazy: () => import("modules/dashboard/Dashboard"),
                children: DashboardRoutes,
              },
              {
                path: urlConstants.BUSINESS,
                lazy: () => import("modules/business/Business"),
                children: BusinessRoutes,
              },
              {
                path: urlConstants.SETTINGS,
                lazy: () => import("modules/settings/Settings"),
                children: SettingsRoutes,
              },
              {
                path: urlConstants.ACCOUNT,
                lazy: () => import("modules/account/Account"),
                children: AccountRoutes,
              },
              {},
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
