import {
  INVOICE,
  INVOICE_DETAIL,
  INVOICE_ADD,
  INVOICE_EDIT,
} from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: INVOICE,
    lazy: () => import("modules/invoice/pages/Invoice"),
  },
  {
    path: INVOICE_DETAIL,
    lazy: () => import("modules/invoice/pages/InvoiceDetail"),
  },
  {
    path: INVOICE_ADD,
    lazy: () => import("modules/invoice/pages/AddInvoice"),
  },
  {
    path: INVOICE_EDIT,
    lazy: () => import("modules/invoice/pages/AddInvoice"),
  },
] as RouteObject[];
