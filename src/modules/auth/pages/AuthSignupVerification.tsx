import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import { subsidiaryApi } from "apis/subsidiary.ts";
import { SIGNIN } from "constants/urls.ts";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";

function AuthSignupVerification() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const [
    verifySubsidiaryBusinessEmailMutation,
    verifySubsidiaryBusinessEmailMutationResult,
  ] = subsidiaryApi.useVerifySubsidiaryBusinessEmailNewMutation();

  const verifyBusinessEmail = useCallback(
    async function verifyBusinessEmail() {
      try {
        const data = await verifySubsidiaryBusinessEmailMutation({
          params: { token, Token: token },
        }).unwrap();
        enqueueSnackbar(data?.message ?? "Account verified successfully!", {
          variant: "success",
        });
        navigate(SIGNIN);
      } catch (error) {
        enqueueSnackbar(
          error?.data?.errors?.[0]?.defaultUserMessage || `Failed to verify!`,
          {
            variant: "error",
          }
        );
      }
    },
    [token, verifySubsidiaryBusinessEmailMutation, enqueueSnackbar, navigate]
  );

  useEffect(() => {
    verifyBusinessEmail().catch();
  }, [verifyBusinessEmail]);

  return (
    <>
      <div>
        <Paper className="p-6">
          {verifySubsidiaryBusinessEmailMutationResult.isLoading && (
            <>
              <Typography variant="h6" className="text-center">
                Verifying your email
              </Typography>
              <Typography className="text-center">
                This will only take a few minutes
              </Typography>
              <div className="flex items-center justify-center my-4">
                <CircularProgress />
              </div>
            </>
          )}
          {verifySubsidiaryBusinessEmailMutationResult.isError && (
            <>
              <Typography variant="h6" className="text-center">
                Failed to verify account
              </Typography>
              <Typography className="text-center" color="textSecondary">
                Click the button below to reverify
              </Typography>
              <div className="flex items-center justify-center gap-4 flex-wrap my-4">
                {/* <LoadingButton
              loading={resendUserVerificationMutationResult.isLoading}
              loadingPosition="start"
              onClick={resendVerification}
              size="large"
            >
              Resend verification
            </LoadingButton> */}
                <Button component={Link} to={SIGNIN} variant="outlined">
                  Login
                </Button>
                <Button onClick={verifyBusinessEmail}>Try Again</Button>
              </div>
            </>
          )}
        </Paper>
      </div>
    </>
  );
}

export const Component = AuthSignupVerification;

export default AuthSignupVerification;
