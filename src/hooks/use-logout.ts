import { useCallback } from "react";
import { logout as logoutAction } from "configs/store-actions";
import useStoreDispatch from "./use-store-dispatch";
import { subsidiaryApi } from "apis/subsidiary";
import { useSnackbar } from "notistack";

function useLogout() {
  const dispatch = useStoreDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [logoutSubsidiaryMutation, logoutSubsidiaryMutationResult] =
    subsidiaryApi.useLogoutSubsidiaryMutation();

  const logout = useCallback(
    async function logout() {
      try {
        await logoutSubsidiaryMutation({}).unwrap();
        dispatch(logoutAction());
        window.location.reload();
      } catch (e) {
        enqueueSnackbar(e.message || "Logout failed", {
          variant: "error",
        });
      }
    },
    [dispatch]
  );

  return { logout, isLoading: logoutSubsidiaryMutationResult.isLoading };
}

export default useLogout;
