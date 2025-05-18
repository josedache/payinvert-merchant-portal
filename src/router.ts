import AppErrorBoundary from "./AppErrorBoundary";
import {
  DASHBOARD,
  ENTRY,
  INVOICES,
  PAYMENT_LINKS,
  ROLES_AND_PERMISSIONS,
  TRANSACTIONS,
} from "constants/urls";
import AuthRoutes from "modules/auth/AuthRoutes";
import DashboardRoutes from "modules/dashboard/DashboardRoutes";
import InvoicesRoutes from "modules/invoices/InvoicesRoutes";
import { BALANCES } from "constants/urls";
import PaymentLinksRoutes from "modules/paymentLinks/PaymentLinksRoutes";
import RolesAndPermissionsRoutes from "modules/rolesAndPermissions/RolesAndPermissionsRoutes";
import TransactionsRoutes from "modules/transactions/TransactionsRoutes";
import { createBrowserRouter } from "react-router-dom";
import BalancesRoutes from "modules/balances/BalanceRoutes";

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
              {
                path: BALANCES,
                lazy: () => import("modules/balances/Balances"),
                children: BalancesRoutes,
              },
              {
                path: TRANSACTIONS,
                lazy: () => import("modules/transactions/Transactions"),
                children: TransactionsRoutes,
              },
              {
                path: PAYMENT_LINKS,
                lazy: () => import("modules/paymentLinks/PaymentLinks"),
                children: PaymentLinksRoutes,
              },
              {
                path: ROLES_AND_PERMISSIONS,
                lazy: () =>
                  import("modules/rolesAndPermissions/RolesAndPermissions"),
                children: RolesAndPermissionsRoutes,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
