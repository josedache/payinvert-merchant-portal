import { WALLET } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: WALLET,
    lazy: () => import("modules/wallet/page/Wallet"),
  },
] as RouteObject[];
