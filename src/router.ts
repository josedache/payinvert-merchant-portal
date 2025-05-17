import AppErrorBoundary from "./AppErrorBoundary";
import { DASHBOARD, ENTRY, INVOICES } from "constants/urls";
import AuthRoutes from "modules/auth/AuthRoutes";
import DashboardRoutes from "modules/dashboard/DashboardRoutes";
import InvoicesRoutes from "modules/invoices/InvoicesRoutes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: ENTRY,
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
                path: DASHBOARD,
                lazy: () => import("modules/dashboard/Dashboard"),
                children: DashboardRoutes,
              },
              {
                path: INVOICES,
                lazy: () => import("modules/invoices/Invoices"),
                children: InvoicesRoutes,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
