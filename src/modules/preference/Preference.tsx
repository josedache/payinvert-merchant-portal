import { Outlet } from "react-router-dom";
import PageTitle from "components/PageTitle";

function ApiKeyAndWebhook() {
  return (
    <>
      <PageTitle breadcrumbs={[{ label: "Preferences" }]}>
        Preferences
      </PageTitle>
      <Outlet />
    </>
  );
}

export default ApiKeyAndWebhook;

export const Component = ApiKeyAndWebhook;
