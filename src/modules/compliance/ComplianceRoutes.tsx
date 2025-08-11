import { COMPLIANCE, COMPLIANCE_UPDATE } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: COMPLIANCE,
    lazy: () => import("./pages/Compliance"),
  },
  {
    path: COMPLIANCE_UPDATE,
    lazy: () => import("./pages/ComplianceUpdate"),
  },
] as RouteObject[];
