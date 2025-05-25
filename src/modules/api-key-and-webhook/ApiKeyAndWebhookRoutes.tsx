import { SETTINGS_API_WEBHOOKS } from "constants/urls";
import { RouteObject } from "react-router-dom";

export default [
  {
    path: SETTINGS_API_WEBHOOKS,
    lazy: () => import("modules/api-key-and-webhook/pages/ApiKeyAndWebhook"),
  },
] as RouteObject[];
