import AppErrorBoundary from "./AppErrorBoundary";
import { createBrowserRouter } from "react-router-dom";

import * as urlConstants from "constants/urls";
import {
  BALANCE,
  CUSTOMER,
  INVOICE,
  PAYMENT_LINK,
  ROLES_AND_PERMISSION,
  API_WEBHOOKS,
  TRANSACTION,
  PREFERENCE,
} from "constants/urls";
import AuthRoutes from "modules/auth/AuthRoutes";
import DashboardRoutes from "modules/dashboard/DashboardRoutes";
import ComplianceRoutes from "modules/compliance/ComplianceRoutes";
import PaymentLinksRoutes from "modules/payment-link/PaymentLinkRoutes";
import RolesRoutes from "modules/role/RoleRoutes";
import TransactionsRoutes from "modules/transaction/TransactionRoutes";
import AccountRoutes from "modules/account/AccountRoutes";
import BusinessRoutes from "modules/business/BusinessRoutes";
import BalancesRoutes from "modules/balance/BalanceRoutes";
import InvoicesRoutes from "modules/invoice/InvoicesRoutes";
import ApiKeyAndWebhookRoutes from "modules/api-key-and-webhook/ApiKeyAndWebhookRoutes";
import CustomerRoutes from "modules/customer/CustomerRoutes";
import SettlementRoutes from "modules/settlement/SettlementRoutes";
import WalletRoutes from "modules/wallet/WalletRoutes";
import CollectionAccountRoutes from "modules/collection-account/CollectionAccountRoutes";
import PayoutRoutes from "modules/payout/PayoutRoutes";
import UserRoutes from "modules/user/UserRoutes";
import PreferenceRoutes from "modules/preference/PreferenceRoutes";

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
                path: urlConstants.COMPLIANCE,
                lazy: () => import("modules/compliance/Compliance"),
                children: ComplianceRoutes,
              },
              {
                path: urlConstants.ACCOUNT,
                lazy: () => import("modules/account/Account"),
                children: AccountRoutes,
              },
              {
                path: urlConstants.PAYOUT,
                lazy: () => import("modules/payout/Payout"),
                children: PayoutRoutes,
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
                lazy: () => import("modules/role/Role"),
                children: RolesRoutes,
              },
              {
                path: API_WEBHOOKS,
                lazy: () =>
                  import("modules/api-key-and-webhook/ApiKeyAndWebhook"),
                children: ApiKeyAndWebhookRoutes,
              },
              {
                path: PREFERENCE,
                lazy: () => import("modules/preference/Preference"),
                children: PreferenceRoutes,
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
              {
                path: CUSTOMER,
                lazy: () => import("modules/customer/Customer"),
                children: CustomerRoutes,
              },
              {
                path: urlConstants.SETTLEMENTS,
                lazy: () => import("modules/settlement/Settlement"),
                children: SettlementRoutes,
              },
              {
                path: urlConstants.WALLET,
                lazy: () => import("modules/wallet/Wallet"),
                children: WalletRoutes,
              },
              {
                path: urlConstants.COLLECTION_ACCOUNT,
                lazy: () =>
                  import("modules/collection-account/CollectionAccount"),
                children: CollectionAccountRoutes,
              },
              {
                path: urlConstants.USER,
                lazy: () => import("modules/user/User"),
                children: UserRoutes,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
