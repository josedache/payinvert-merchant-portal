import { Outlet } from "react-router-dom";

function ApiKeyAndWebhook() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default ApiKeyAndWebhook;

export const Component = ApiKeyAndWebhook;
