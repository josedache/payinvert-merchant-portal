import {
  Button,
  ButtonBase,
  Icon,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthSigninFormikValues } from "modules/auth/types/auth-signin.ts";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import {
  DASHBOARD,
  DASHBOARD_ONBOARDING,
  SIGNIN_2FA,
  SIGNUP,
} from "constants/urls.ts";
import { getTextFieldProps } from "utils/formik/get-text-field-props.ts";
import PasswordTextField from "components/PasswordTextField.tsx";
import AuthPasswordResetRequest from "modules/auth/features/AuthPasswordResetRequest.tsx";
import { LoadingButton } from "@mui/lab";
import { subsidiaryApi } from "apis/subsidiary.ts";

function AuthSignin() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [loginSubsidiaryMutation] = subsidiaryApi.useLoginSubsidiaryMutation();

  const formik = useFormik<AuthSigninFormikValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnMount: false,
    validateOnChange: false,
    validationSchema: yup.object({
      email: yup.string().label("Email").email().trim().required(),
      password: yup.string().label("Password").trim().required(),
    }),
    onSubmit: async (values) => {
      try {
        const data = await loginSubsidiaryMutation({
          body: {
            email: values.email,
            password: btoa(values.password ?? ""),
          },
        }).unwrap();

        if (data.token?.accessToken) {
          enqueueSnackbar(data?.message || "Logged In Successfully!", {
            variant: "success",
          });

          return navigate(
            !data?.businessDetails?.active ? DASHBOARD_ONBOARDING : DASHBOARD
          );
        } else {
          enqueueSnackbar(
            data?.message || "An OTP is sent to your email address",
            {
              variant: "success",
            }
          );
          return navigate(SIGNIN_2FA, {
            state: { email: values.email, message: data?.message },
          });
        }
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

  return (
    <>
      <div>
        <Paper component="form" className="p-6" onSubmit={formik.handleSubmit}>
          <Typography variant="h6">Sign in to your Account</Typography>
          <div className="grid gap-4 py-6">
            <TextField
              fullWidth
              label="Email Address"
              placeholder="Enter your Email Address"
              {...getTextFieldProps(formik, "email")}
              required
            />
            <div>
              <PasswordTextField
                fullWidth
                label="Password"
                placeholder="Enter your password"
                {...getTextFieldProps(formik, "password")}
                required
              />
              <div className="flex justify-end">
                <AuthPasswordResetRequest>
                  {({ toggleOpen }) => (
                    <Typography
                      component={ButtonBase}
                      variant="body2"
                      className="text-primary-main font-bold mt-2"
                      onClick={() => toggleOpen()}
                    >
                      Forgot your password?
                    </Typography>
                  )}
                </AuthPasswordResetRequest>
              </div>
            </div>
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
            Sign in
          </LoadingButton>
        </Paper>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Typography className="font-bold">Don’t have an account?</Typography>
          <Button
            variant="soft"
            component={Link}
            to={SIGNUP}
            startIcon={<Icon>account_circle</Icon>}
          >
            Create an account
          </Button>
        </div>
      </div>
    </>
  );
}

export default AuthSignin;

export const Component = AuthSignin;
