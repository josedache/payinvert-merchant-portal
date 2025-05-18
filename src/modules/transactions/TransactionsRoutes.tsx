import { TRANSACTION_DETAIL, TRANSACTION } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: TRANSACTION,
    lazy: () => import("modules/transactions/pages/Transaction"),
  },
  {
    path: TRANSACTION_DETAIL,
    lazy: () => import("modules/transactions/pages/TransactionDetails"),
  },
] as RouteObject[];
