import { PAYOUT_SETTING } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: PAYOUT_SETTING,
    lazy: () => import("./pages/PayoutAccountSetting"),
  },
] as RouteObject[];
