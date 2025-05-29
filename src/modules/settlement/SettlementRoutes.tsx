import { SETTLEMENTS } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: SETTLEMENTS,
    lazy: () => import("modules/settlement/pages/Settlement"),
  },
] as RouteObject[];
