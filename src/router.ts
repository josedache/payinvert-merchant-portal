import AppErrorBoundary from "./AppErrorBoundary";
import AuthRoutes from "modules/auth/AuthRoutes";
import DashboardRoutes from "modules/dashboard/DashboardRoutes";
import InvoicesRoutes from "modules/invoices/InvoicesRoutes";
import { BALANCES } from "constants/urls";
import { createBrowserRouter } from "react-router-dom";
import * as urlConstants from "constants/urls";
import SettingsRoutes from "modules/settings/SettingsRoutes";
import BalancesRoutes from "modules/balances/BalanceRoutes";

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
                path: urlConstants.INVOICES,
                lazy: () => import("modules/invoices/Invoices"),
                children: InvoicesRoutes,
              },
              {
                path: urlConstants.INVOICES,
                lazy: () => import("modules/invoices/Invoices"),
                children: InvoicesRoutes,
              },
              {
                path: urlConstants.SETTINGS,
                lazy: () => import("modules/settings/Settings"),
                children: SettingsRoutes,
              },
              {
                path: BALANCES,
                lazy: () => import("modules/balances/Balances"),
                children: BalancesRoutes,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
