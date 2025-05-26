import { CUSTOMER, CUSTOMER_DETAIL } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: CUSTOMER,
    lazy: () => import("modules/customer/pages/CustomerList"),
  },
  {
    path: CUSTOMER_DETAIL,
    lazy: () => import("modules/customer/pages/CustomerDetails"),
  },
] as RouteObject[];
