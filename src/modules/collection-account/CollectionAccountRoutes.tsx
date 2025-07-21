import { COLLECTION_ACCOUNT } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: COLLECTION_ACCOUNT,
    lazy: () =>
      import("modules/collection-account/pages/CollectionAccountList"),
  },
] as RouteObject[];
