import { USER } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: USER,
    lazy: () => import("./pages/UserList"),
  },
] as RouteObject[];
