import { COMPLIANCE } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: COMPLIANCE,
    lazy: () => import("modules/settings/pages/SettingsCompliance"),
  },
] as RouteObject[];
