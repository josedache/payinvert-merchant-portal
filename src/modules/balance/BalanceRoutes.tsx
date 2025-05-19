import { BALANCE, BALANCE_HISTORY } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: BALANCE,
    lazy: () => import("modules/balance/page/Balance"),
  },
  {
    path: BALANCE_HISTORY,
    lazy: () => import("modules/balance/page/BalanceHistory"),
  },
] as RouteObject[];
