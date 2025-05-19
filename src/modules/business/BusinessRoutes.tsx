import { BUSINESS } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: BUSINESS,
    lazy: () => import("modules/business/pages/Business"),
  },
] as RouteObject[];
