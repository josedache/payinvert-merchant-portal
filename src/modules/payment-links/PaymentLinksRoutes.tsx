import { PAYMENT_LINK_DETAIL, PAYMENT_LINKS } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: PAYMENT_LINKS,
    lazy: () => import("modules/payment-links/pages/PaymentLinks"),
  },
  {
    path: PAYMENT_LINK_DETAIL,
    lazy: () => import("modules/payment-links/pages/PaymentLinksDetails"),
  },
] as RouteObject[];
