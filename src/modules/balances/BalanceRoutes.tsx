import { BALANCES, BALANCE_HISTORY } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: BALANCES,
    lazy: () => import("modules/balances/page/Balances"),
  },
  {
    path: BALANCE_HISTORY,
    lazy: () => import("modules/balances/page/BalanceHistory"),
  },
] as RouteObject[];
