import { SETTINGS, SETTINGS_COMPLIANCE_INFO } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: SETTINGS,
    lazy: () => import("modules/settings/pages/Settings"),
  },
  {
    path: SETTINGS_COMPLIANCE_INFO,
    lazy: () => import("modules/settings/pages/SettingsCompliance"),
  },
] as RouteObject[];
