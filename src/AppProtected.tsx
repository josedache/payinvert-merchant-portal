/* eslint-disable react-refresh/only-export-components */
import { Outlet, redirect } from "react-router-dom";
import { useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import LoadingContent from "components/LoadingContent";
import useAuthUser from "hooks/use-auth-user";
import useLogout from "hooks/use-logout";
import store from "configs/store";
import { SIGNIN } from "constants/urls";
import { CircularProgress } from "@mui/material";
import Logo from "components/Logo";
import { subsidiaryApi } from "apis/subsidiary.ts";

function AppProtected() {
  const { logout } = useLogout();

  const subsidiaryMeQueryResult =
    subsidiaryApi.useGetSubsidiaryMeQuery(undefined);

  const authUser = useAuthUser();

  useEffect(() => {
    const timer = setInterval(() => {
      if (authUser?.expiresIn) {
        const differenceInExpiration = differenceInSeconds(
          new Date(authUser?.expiresIn),
          new Date()
        );

        if (differenceInExpiration <= 30) {
          // setRefreshTokenDialog(true);
        }

        if (differenceInExpiration <= 0) {
          logout();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <LoadingContent
      fullHeight
      loading={subsidiaryMeQueryResult.isLoading}
      error={subsidiaryMeQueryResult.isError}
      onRetry={subsidiaryMeQueryResult.refetch}
      renderLoading={() => (
        <div className="flex flex-col justify-center items-center h-screen">
          <div>
            <Logo className="w-full h-full max-w-[100px]" />
          </div>
          <CircularProgress size={25} />
        </div>
      )}
      className="h-screen"
    >
      {() => (
        <>
          <Outlet />
        </>
      )}
    </LoadingContent>
  );
}

export default AppProtected;

export const Component = AppProtected;

export function loader() {
  const { authUser } = store.getState().global;

  if (!authUser?.isAuthenticated) {
    return redirect(SIGNIN);
  }

  return null;
}
