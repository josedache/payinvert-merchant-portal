import { useSnackbar } from "notistack";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { DASHBOARD, SIGNIN } from "constants/urls.ts";
import { extractSearchParams } from "utils/url/extract-search-params.ts";
import {
  Icon,
  Paper,
  Typography,
  Link as MuiLink,
  ButtonBase,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import OtpInput from "components/OtpInput.tsx";
import NumberInput from "components/NumberInput.tsx";
import { subsidiaryApi } from "apis/subsidiary.ts";
import Countdown from "components/Countdown.tsx";
import { useState } from "react";
import useAuthUser from "hooks/use-auth-user.ts";

function AuthSignin2fa() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { email, message } = extractSearchParams(searchParams, {
    email: "",
    message: "Enter the One-Time Password (OTP) sent to your email",
  });

  const authUser = useAuthUser();

  const [completeSubsidiaryLoginMutation] =
    subsidiaryApi.useCompleteSubsidiaryLoginMutation();

  const [resendSubsidiaryOtpMutation, resendSubsidiaryOtpMutationResult] =
    subsidiaryApi.useResendSubsidiaryOtpMutation();

  const [countdownDate, setCountdownDate] = useState(getCountdownDate);

  const formik = useFormik<{ otp: string }>({
    initialValues: {
      otp: "",
    },
    validateOnMount: true,
    validationSchema: yup.object({
      otp: yup.string().label("OTP").length(6).trim().required(),
    }),
    onSubmit: async (values) => {
      try {
        const data = await completeSubsidiaryLoginMutation({
          body: {
            email: email,
            otp: values.otp,
            subsidiaryId: authUser?.activeSubsidiary?.id,
          },
        }).unwrap();

        enqueueSnackbar(data?.message || "Logged In Successfully!", {
          variant: "success",
        });
        return navigate(DASHBOARD);
      } catch (error) {
        enqueueSnackbar(
          error?.message || error?.data?.message || "Failed to Login",
          {
            variant: "error",
          }
        );
      }
    },
  });

  async function sendOtp() {
    try {
      await resendSubsidiaryOtpMutation({
        body: { identifier: email, loginHash: authUser?.loginHash },
      }).unwrap();
      setCountdownDate(getCountdownDate());
      enqueueSnackbar("OTP sent successfully!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(
        error?.data?.errors?.[0]?.defaultUserMessage || `OTP failed to send!`,
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
        <Paper component="form" className="p-6" onSubmit={formik.handleSubmit}>
          <Typography variant="h6">{message}</Typography>
          <div className="py-6 space-y-4">
            <div className="flex items-center justify-center">
              <OtpInput
                value={formik.values.otp}
                onChange={(otp) => {
                  formik.setFieldValue("otp", otp);
                }}
                numInputs={6}
                shouldAutoFocus
                inputType="password"
                slot={{ input: NumberInput }}
                slotProps={{
                  input: {
                    style: { opacity: formik.isSubmitting ? 0.5 : 1 },
                    disabled: formik.isSubmitting,
                  },
                }}
              />
            </div>
            <Countdown date={countdownDate}>
              {(countdown) => {
                const isCodeSent =
                  countdown.days ||
                  countdown.minutes ||
                  countdown.seconds ||
                  countdown.seconds;

                return (
                  <>
                    <div className="flex items-center justify-center">
                      <Typography className="text-center flex items-center gap-1">
                        Didn't receive OTP?{" "}
                        {isCodeSent ? (
                          <Typography
                            variant="body2"
                            color="primary"
                            className="text-center"
                          >
                            Resend OTP in{" "}
                            <Typography
                              component="span"
                              color="primary"
                              className=""
                            >
                              {countdown.minutes}:
                              {countdown.seconds < 10
                                ? `0${countdown.seconds}`
                                : countdown.seconds}
                            </Typography>
                          </Typography>
                        ) : (
                          <ButtonBase
                            disableRipple
                            color="primary"
                            disabled={
                              resendSubsidiaryOtpMutationResult?.isLoading
                            }
                            component={MuiLink}
                            onClick={sendOtp}
                            className=""
                          >
                            <span className="text-primary-main">
                              Resend OTP
                            </span>
                          </ButtonBase>
                        )}
                      </Typography>
                    </div>
                  </>
                );
              }}
            </Countdown>
          </div>
          <LoadingButton
            type="submit"
            fullWidth
            disabled={!formik.isValid || !formik.dirty}
            // size="large"
            loading={formik.isSubmitting}
            loadingPosition="end"
            endIcon={<></>}
            startIcon={<Icon>login</Icon>}
          >
            Complete Sign In
          </LoadingButton>
        </Paper>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Typography className="font-bold">
            Sign into another account?
          </Typography>
          <Button
            variant="soft"
            component={Link}
            to={SIGNIN}
            startIcon={<Icon>account_circle</Icon>}
          >
            Click here
          </Button>
        </div>
      </div>
    </>
  );
}

export const Component = AuthSignin2fa;

export default AuthSignin2fa;

function getCountdownDate() {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 10);
  return date;
}
