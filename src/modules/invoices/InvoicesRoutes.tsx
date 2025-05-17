import { INVOICES } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: INVOICES,
    lazy: () => import("modules/invoices/pages/Invoices"),
  },
] as RouteObject[];
