import { TRANSACTION_DETAIL, TRANSACTIONS } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: TRANSACTIONS,
    lazy: () => import("modules/transactions/pages/Transactions"),
  },
  {
    path: TRANSACTION_DETAIL,
    lazy: () => import("modules/transactions/pages/TransactionsDetails"),
  },
] as RouteObject[];
