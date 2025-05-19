import { ACCOUNT_BALANCES } from "constants/urls";
import { RouteObject } from "react-router-dom";
import BalancesRoutes from "modules/balances/BalanceRoutes";

export default [
  {
    path: ACCOUNT_BALANCES,
    lazy: () => import("modules/balances/Balances"),
    children: BalancesRoutes,
  },
] as RouteObject[];
