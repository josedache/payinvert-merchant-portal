import { PAYMENT_LINK_DETAIL, PAYMENT_LINKS } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: PAYMENT_LINKS,
    lazy: () => import("modules/paymentLinks/pages/PaymentLinks"),
  },
  {
    path: PAYMENT_LINK_DETAIL,
    lazy: () => import("modules/paymentLinks/pages/PaymentLinksDetails"),
  },
] as RouteObject[];
