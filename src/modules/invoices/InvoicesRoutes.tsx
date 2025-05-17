import { INVOICES, INVOICE_DETAIL } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: INVOICES,
    lazy: () => import("modules/invoices/pages/Invoices"),
  },
  {
    path: INVOICE_DETAIL,
    lazy: () => import("modules/invoices/pages/InvoiceDetail"),
  },
] as RouteObject[];
