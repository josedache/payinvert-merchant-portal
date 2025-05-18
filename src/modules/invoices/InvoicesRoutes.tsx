import {
  INVOICES,
  INVOICE_DETAIL,
  INVOICE_ADD,
  INVOICE_EDIT,
} from "constants/urls";
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
  {
    path: INVOICE_ADD,
    lazy: () => import("modules/invoices/pages/AddInvoice"),
  },
  {
    path: INVOICE_EDIT,
    lazy: () => import("modules/invoices/pages/AddInvoice"),
  },
] as RouteObject[];
