import { Button, Icon, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { SIGNIN } from "constants/urls.ts";
import { getTextFieldProps } from "utils/formik/get-text-field-props.ts";
import PasswordTextField from "components/PasswordTextField.tsx";
import { LoadingButton } from "@mui/lab";
import { subsidiaryApi } from "apis/subsidiary.ts";
import { extractSearchParams } from "utils/url/extract-search-params.ts";
import NumberTextField from "components/NumberTextField.tsx";

function AuthPasswordReset() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { identifier } = extractSearchParams(searchParams, {
    identifier: "josedache0@gmail.com",
  });

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
        .min(8, "Your password must be at least 8 characters long")
        .max(25)
        .matches(/^(?=.{8,})/, "Must Contain 8 Characters")
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
            newPassword: btoa(values.newPassword ?? ""),
            confirmPassword: btoa(values.confirmPassword ?? ""),
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
