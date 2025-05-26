import { SETTINGS_PAYOUT_ACCOUNTS } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: SETTINGS_PAYOUT_ACCOUNTS,
    lazy: () => import("modules/payout-account/pages/PayoutAccount"),
  },
] as RouteObject[];
