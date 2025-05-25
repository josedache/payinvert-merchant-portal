import {
  PAYMENT_LINK_DETAIL,
  PAYMENT_LINK,
  PAYMENT_LINK_PRODUCT_DETAIL,
} from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: PAYMENT_LINK,
    lazy: () => import("modules/payment-link/pages/PaymentLink"),
  },
  {
    path: PAYMENT_LINK_DETAIL,
    lazy: () => import("modules/payment-link/pages/PaymentLinkDetails"),
  },
  {
    path: PAYMENT_LINK_PRODUCT_DETAIL,
    lazy: () => import("modules/payment-link/pages/PaymentLinkProduct"),
  },
] as RouteObject[];
