import AppErrorBoundary from "./AppErrorBoundary";
import { createBrowserRouter } from "react-router-dom";

import {
  INVOICE,
  PAYMENT_LINK,
  ROLES_AND_PERMISSION,
  TRANSACTION,
  BALANCE,
} from "constants/urls";
import * as urlConstants from "constants/urls";
import AuthRoutes from "modules/auth/AuthRoutes";
import DashboardRoutes from "modules/dashboard/DashboardRoutes";
import PaymentLinksRoutes from "modules/payment-link/PaymentLinkRoutes";
import RolesAndPermissionsRoutes from "modules/role-and-permission/RoleAndPermissionRoutes";
import TransactionsRoutes from "modules/transaction/TransactionRoutes";
import SettingsRoutes from "modules/settings/SettingsRoutes";
import AccountRoutes from "modules/account/AccountRoutes";
import BusinessRoutes from "modules/business/BusinessRoutes";
import BalancesRoutes from "modules/balance/BalanceRoutes";
import InvoicesRoutes from "modules/invoice/InvoicesRoutes";

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
              {
                path: TRANSACTION,
                lazy: () => import("modules/transaction/Transaction"),
                children: TransactionsRoutes,
              },
              {
                path: PAYMENT_LINK,
                lazy: () => import("modules/payment-link/PaymentLink"),
                children: PaymentLinksRoutes,
              },
              {
                path: ROLES_AND_PERMISSION,
                lazy: () =>
                  import("modules/role-and-permission/RoleAndPermission"),
                children: RolesAndPermissionsRoutes,
              },
              {
                path: INVOICE,
                lazy: () => import("modules/invoice/Invoice"),
                children: InvoicesRoutes,
              },
              {
                path: BALANCE,
                lazy: () => import("modules/balance/Balance"),
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
