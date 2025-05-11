import { useSnackbar } from "notistack";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { DASHBOARD, SIGNIN } from "constants/urls.ts";
import { extractSearchParams } from "utils/url/extract-search-params.ts";
import { Button, Icon, Paper, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { subsidiaryApi } from "apis/subsidiary.ts";
import useAuthUser from "hooks/use-auth-user.ts";
import { IS_VIRTUAL_DEVELOPMENT } from "constants/env.ts";

function AuthSignupVerification() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { email } = extractSearchParams(searchParams, {
    email: "",
  });

  const authUser = useAuthUser();

  const [
    resendSubsidiaryVerificationEmailMutation,
    resendSubsidiaryVerificationEmailMutationResult,
  ] = subsidiaryApi.useResendSubsidiaryVerificationEmailMutation();

  const [
    verifySubsidiaryBusinessEmailMutation,
    verifySubsidiaryBusinessEmailMutationResult,
  ] = subsidiaryApi.useVerifySubsidiaryBusinessEmailMutation();

  async function resendVerificationEmail() {
    try {
      const data = await resendSubsidiaryVerificationEmailMutation({
        body: { identifier: email, loginHash: authUser?.loginHash },
      }).unwrap();
      enqueueSnackbar(data?.message ?? "Account verified successfully!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(
        error?.data?.errors?.[0]?.defaultUserMessage || `Failed to verify!`,
        {
          variant: "error",
        }
      );
    }
  }

  async function verifyBusinessEmail() {
    try {
      const data = await verifySubsidiaryBusinessEmailMutation({
        body: { identifier: email, loginHash: authUser?.loginHash },
      }).unwrap();
      enqueueSnackbar(data?.message ?? "Account verified successfully!", {
        variant: "success",
      });
      navigate(DASHBOARD);
    } catch (error) {
      enqueueSnackbar(
        error?.data?.errors?.[0]?.defaultUserMessage || `Failed to verify!`,
        {
          variant: "error",
        }
      );
    }
  }

  if (!email) {
    return <Navigate to={SIGNIN} replace />;
  }

  return (
    <>
      <div>
        <Paper className="p-6">
          <Typography variant="h6">
            A mail has been sent to your email address{" "}
            <span className="text-primary-main">{email}</span>, verify to sign
            in.
          </Typography>
          <div className="py-6 space-y-4">
            <LoadingButton
              fullWidth
              // size="large"
              loading={
                resendSubsidiaryVerificationEmailMutationResult.isLoading
              }
              loadingPosition="end"
              endIcon={<></>}
              onClick={resendVerificationEmail}
            >
              Resend Link
            </LoadingButton>
            {IS_VIRTUAL_DEVELOPMENT ? (
              <LoadingButton
                variant="outlined"
                fullWidth
                // size="large"
                loading={verifySubsidiaryBusinessEmailMutationResult.isLoading}
                loadingPosition="end"
                endIcon={<></>}
                onClick={verifyBusinessEmail}
              >
                Verify Test Mode
              </LoadingButton>
            ) : null}
          </div>
        </Paper>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Typography className="font-bold">Back to sign in page</Typography>
          <Button
            variant="soft"
            component={Link}
            to={SIGNIN}
            startIcon={<Icon>account_circle</Icon>}
          >
            Sign In
          </Button>
        </div>
      </div>
    </>
  );
}

export const Component = AuthSignupVerification;

export default AuthSignupVerification;
