import { DEVELOPMENT } from "constants/env";
import AppNotFound from "./AppNotFound";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function AppErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <AppNotFound />;
    }

    if (error.status === 401) {
      return <div>You are not authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }
  }
  if (DEVELOPMENT) {
    console.error(`### Error Occured ####\n`, error);
  }

  return <div>Something went wrong</div>;
}

export default AppErrorBoundary;
