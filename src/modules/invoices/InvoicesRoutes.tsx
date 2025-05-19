import {
  BUSINESS_INVOICES,
  BUSINESS_INVOICES_ADD,
  BUSINESS_INVOICES_DETAIL,
  BUSINESS_INVOICES_EDIT,
} from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: BUSINESS_INVOICES,
    lazy: () => import("modules/invoices/pages/Invoices"),
  },
  {
    path: BUSINESS_INVOICES_DETAIL,
    lazy: () => import("modules/invoices/pages/InvoiceDetail"),
  },
  {
    path: BUSINESS_INVOICES_ADD,
    lazy: () => import("modules/invoices/pages/AddInvoice"),
  },
  {
    path: BUSINESS_INVOICES_EDIT,
    lazy: () => import("modules/invoices/pages/AddInvoice"),
  },
] as RouteObject[];
