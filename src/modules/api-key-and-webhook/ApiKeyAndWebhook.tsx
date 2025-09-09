import { Outlet } from "react-router-dom";
import PageTitle from "components/PageTitle";

function ApiKeyAndWebhook() {
  return (
    <>
      <PageTitle breadcrumbs={[{ label: "API keys & Webhooks" }]}>
        API keys & Webhooks
      </PageTitle>
      <Outlet />
    </>
  );
}

export default ApiKeyAndWebhook;

export const Component = ApiKeyAndWebhook;
