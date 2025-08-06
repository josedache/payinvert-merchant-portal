import { Button, Icon, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { SIGNIN } from "constants/urls";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import PasswordTextField from "components/PasswordTextField";
import { LoadingButton } from "@mui/lab";
import { subsidiaryApi } from "apis/subsidiary";
import NumberTextField from "components/NumberTextField";
import { Icon as Iconify } from "@iconify/react";

function AuthPasswordReset() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const location = useLocation();

  const identifier = location.state?.identifier;

  const [
    forgotPasswordSubsidiaryMutation,
    forgotPasswordSubsidiaryMutationResult,
  ] = subsidiaryApi.useForgotPasswordSubsidiaryMutation();

  const [completeSubsidiaryForgotPasswordMutation] =
    subsidiaryApi.useCompleteSubsidiaryForgotPasswordMutation();

  const formik = useFormik<{
    otp: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({
    initialValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    validateOnMount: true,
    validationSchema: yup.object({
      otp: yup.string().label("OTP").length(6).trim().required(),
      newPassword: yup
        .string()
        .label("Password")
        .trim()
        .min(12, "Your password must be at least 12 characters long")
        .max(25, "Your password must be at most 25 characters long")
        // .matches(/^(?=.{12,})/, "Must Contain 12 Characters")
        .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase")
        .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase")
        .matches(/^(?=.*\d)/, "Must contain a number")
        .matches(/^(?=.*[@$!%*?&#%])/, "Must contain a special character")
        .required(),
      confirmPassword: yup
        .string()
        .label("Confirm Password")
        .oneOf([yup.ref("newPassword")], "Passwords must match")
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        const data = await completeSubsidiaryForgotPasswordMutation({
          body: {
            identifier: identifier,
            otp: values.otp,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          },
        }).unwrap();

        enqueueSnackbar(data?.message || "Password reset successful", {
          variant: "success",
        });

        navigate(SIGNIN);
      } catch (error) {
        enqueueSnackbar(
          error?.message || error?.data?.message || "Failed to reset password",
          {
            variant: "error",
          }
        );
      }
    },
  });

  async function resendOtp(e: any) {
    e.preventDefault();
    try {
      const data = await forgotPasswordSubsidiaryMutation({
        body: {
          identifier,
        },
      }).unwrap();

      enqueueSnackbar(
        data?.message || "Password reset request sent successful",
        {
          variant: "success",
        }
      );
    } catch (error) {
      enqueueSnackbar(
        error?.message ||
          error?.data?.message ||
          "Failed to send password reset request. Please try again.",
        {
          variant: "error",
        }
      );
    }
  }

  if (!identifier) {
    return <Navigate to={SIGNIN} replace />;
  }

  return (
    <>
      <div>
        <Paper component="form" className="p-6" onSubmit={formik.handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Reset Account Password
          </Typography>
          <Typography className="text-text-secondary">
            Enter the One-Time Password (OTP) and your new password for your
            account <span className="text-primary-main">{identifier}</span>{" "}
            below
          </Typography>
          <div className="grid gap-4 py-6">
            <NumberTextField
              freeSolo
              maskOptions={{ min: 0, max: 6 }}
              fullWidth
              label="One-Time Password (OTP)"
              placeholder="Enter your One-Time Password (OTP)"
              {...getTextFieldProps(formik, "otp")}
              required
            />
            <PasswordTextField
              fullWidth
              label="New Password"
              placeholder="Enter your new password"
              {...getTextFieldProps(formik, "newPassword")}
              required
            />
            <PasswordTextField
              fullWidth
              label="Confirm Password"
              placeholder="Enter your new password"
              {...getTextFieldProps(formik, "confirmPassword")}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <LoadingButton
              variant="outlined"
              fullWidth
              // size="large"
              loading={forgotPasswordSubsidiaryMutationResult.isLoading}
              loadingPosition="end"
              endIcon={<></>}
              startIcon={
                <Icon>
                  <Iconify icon="mdi:email-resend" />
                </Icon>
              }
              onClick={resendOtp}
            >
              Resend OTP
            </LoadingButton>
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
              Reset Password
            </LoadingButton>
          </div>
        </Paper>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Typography className="font-bold">Have an account?</Typography>
          <Button
            variant="soft"
            component={Link}
            to={SIGNIN}
            startIcon={<Icon>account_circle</Icon>}
          >
            Sign into account
          </Button>
        </div>
      </div>
    </>
  );
}

export default AuthPasswordReset;

export const Component = AuthPasswordReset;
