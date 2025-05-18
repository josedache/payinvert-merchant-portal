import AppErrorBoundary from "./AppErrorBoundary";
import {
  DASHBOARD,
  ENTRY,
  INVOICES,
  PAYMENT_LINK,
  ROLES_AND_PERMISSIONS,
  TRANSACTION,
} from "constants/urls";
import AuthRoutes from "modules/auth/AuthRoutes";
import DashboardRoutes from "modules/dashboard/DashboardRoutes";
import InvoicesRoutes from "modules/invoices/InvoicesRoutes";
import { BALANCES } from "constants/urls";
import PaymentLinksRoutes from "modules/payment-link/PaymentLinkRoutes";
import RolesAndPermissionsRoutes from "modules/roles-and-permissions/RolesAndPermissionsRoutes";
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
                path: TRANSACTION,
                lazy: () => import("modules/transactions/Transactions"),
                children: TransactionsRoutes,
              },
              {
                path: PAYMENT_LINK,
                lazy: () => import("modules/payment-link/PaymentLink"),
                children: PaymentLinksRoutes,
              },
              {
                path: ROLES_AND_PERMISSIONS,
                lazy: () =>
                  import("modules/roles-and-permissions/RolesAndPermissions"),
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
