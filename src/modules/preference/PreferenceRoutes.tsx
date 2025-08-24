import { PREFERENCE } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: PREFERENCE,
    lazy: () => import("modules/preference/pages/Preference"),
  },
] as RouteObject[];
