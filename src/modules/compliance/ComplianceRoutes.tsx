import { SETTINGS_COMPLIANCE_INFO } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: SETTINGS_COMPLIANCE_INFO,
    lazy: () => import("modules/compliance/pages/Compliance"),
  },
] as RouteObject[];
