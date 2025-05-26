import { TRANSACTION_DETAIL, TRANSACTION } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: TRANSACTION,
    lazy: () => import("modules/transaction/pages/TransactionList"),
  },
  {
    path: TRANSACTION_DETAIL,
    lazy: () => import("modules/transaction/pages/TransactionDetails"),
  },
] as RouteObject[];
