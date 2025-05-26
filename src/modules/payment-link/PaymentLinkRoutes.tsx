import { PAYMENT_LINK_DETAIL, PAYMENT_LINK } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: PAYMENT_LINK,
    lazy: () => import("modules/payment-link/pages/PaymentLinkList.tsx"),
  },
  {
    path: PAYMENT_LINK_DETAIL,
    lazy: () => import("modules/payment-link/pages/PaymentLinkDetails"),
  },
] as RouteObject[];
