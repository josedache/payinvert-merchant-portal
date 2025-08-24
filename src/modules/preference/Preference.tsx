import { Outlet } from "react-router-dom";
import PageTitle from "components/PageTitle";

function ApiKeyAndWebhook() {
  return (
    <>
      <PageTitle>Preferences</PageTitle>
      <Outlet />
    </>
  );
}

export default ApiKeyAndWebhook;

export const Component = ApiKeyAndWebhook;
