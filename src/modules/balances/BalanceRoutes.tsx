import { ACCOUNT_BALANCE_HISTORY, ACCOUNT_BALANCES } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: ACCOUNT_BALANCES,
    lazy: () => import("modules/balances/page/Balances"),
  },
  {
    path: ACCOUNT_BALANCE_HISTORY,
    lazy: () => import("modules/balances/page/BalanceHistory"),
  },
] as RouteObject[];
