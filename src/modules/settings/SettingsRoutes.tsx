import { SETTINGS_COMPLIANCE } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: SETTINGS_COMPLIANCE,
    lazy: () => import("modules/settings/pages/SettingsCompliance"),
  },
] as RouteObject[];
