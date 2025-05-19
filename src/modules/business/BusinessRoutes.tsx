import { BUSINESS_INVOICES } from "constants/urls";
import { RouteObject } from "react-router-dom";
import InvoicesRoutes from "modules/invoices/InvoicesRoutes";

export default [
  {
    path: BUSINESS_INVOICES,
    lazy: () => import("modules/invoices/Invoices"),
    children: InvoicesRoutes,
  },
] as RouteObject[];
