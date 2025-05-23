import { Button, Icon, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthSignupFormikValues } from "modules/auth/types/auth-signup.ts";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { SIGNIN, SIGNUP_VERIFY } from "constants/urls.ts";
import { getTextFieldProps } from "utils/formik/get-text-field-props.ts";
import PasswordTextField from "components/PasswordTextField.tsx";
import { LoadingButton } from "@mui/lab";
import { subsidiaryApi } from "apis/subsidiary.ts";
import AlphabetTextField from "components/AlphabetTextField.tsx";
import NumberTextField from "components/NumberTextField.tsx";

function AuthSignup() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const [signupSubsidiaryMutation] =
    subsidiaryApi.useSignupSubsidiaryMutation();

  const formik = useFormik<AuthSignupFormikValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      userEmail: "",
      mobileNumber: "",
      businessName: "",
      password: "",
      confirmpassword: "",
    },
    validateOnMount: true,
    validationSchema: yup.object({
      firstName: yup.string().label("First Name").trim().required(),
      lastName: yup.string().label("Last Name").trim().required(),
      userEmail: yup.string().label("Email").email().trim().required(),
      mobileNumber: yup
        .string()
        .label("Mobile Number")
        .trim()
        .length(11)
        .required(),
      businessName: yup.string().label("Business Name").trim().required(),
      password: yup
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
      confirmpassword: yup
        .string()
        .label("Confirm Password")
        .oneOf([yup.ref("password")], "Passwords must match")
        .required(),
    }),
    onSubmit: async (values) => {
      try {
        const data = await signupSubsidiaryMutation({
          body: {
            ...values,
            password: btoa(values.password ?? ""),
            confirmpassword: btoa(values.confirmpassword ?? ""),
          },
        }).unwrap();

        enqueueSnackbar(data?.message || "Sign up Successful", {
          variant: "success",
        });

        return navigate(SIGNUP_VERIFY, { state: { email: values.userEmail } });
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
          <Typography variant="h6">Create an Account</Typography>
          <div className="grid gap-4 p-6 -mx-6 max-h-[calc(100vh-350px)] overflow-y-auto">
            <AlphabetTextField
              fullWidth
              label="First Name & Middle Name"
              placeholder="Enter your Name"
              {...getTextFieldProps(formik, "firstName")}
              required
            />
            <AlphabetTextField
              fullWidth
              label="Last Name"
              placeholder="Enter your Last Name"
              {...getTextFieldProps(formik, "lastName")}
              required
            />
            <TextField
              fullWidth
              label="Email Address"
              placeholder="Enter your Email Address"
              {...getTextFieldProps(formik, "userEmail")}
              required
            />
            <NumberTextField
              freeSolo
              maskOptions={{ min: 0, max: 11 }}
              fullWidth
              label="Phone number"
              placeholder="Enter your Phone number"
              {...getTextFieldProps(formik, "mobileNumber")}
              required
            />
            <TextField
              fullWidth
              label="Business Name"
              placeholder="Enter your Business Name"
              {...getTextFieldProps(formik, "businessName")}
              required
            />
            <PasswordTextField
              fullWidth
              label="Password"
              placeholder="Enter your new password"
              {...getTextFieldProps(formik, "password")}
              required
            />
            <PasswordTextField
              fullWidth
              label="Confirm Password"
              placeholder="Enter your password"
              {...getTextFieldProps(formik, "confirmpassword")}
              required
            />
            <Typography variant="body2">
              By clicking this "Create Account" Button, you agree to the{" "}
              <a
                className="text-primary-main"
                href="https://payinvert.com/terms-conditions"
                target="_blank"
              >
                Terms
              </a>{" "}
              of acceptable use,{" "}
              <a
                className="text-primary-main"
                href="https://payinvert.com/privacy-policy"
                target="_blank"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                className="text-primary-main"
                href="https://payinvert.com/cookies"
                target="_blank"
              >
                Cookie Policy
              </a>
            </Typography>
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
            Create account
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

export default AuthSignup;

export const Component = AuthSignup;
