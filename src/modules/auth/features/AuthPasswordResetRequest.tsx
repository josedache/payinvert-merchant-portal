import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import useToggle from "hooks/use-toggle.ts";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  TextField,
} from "@mui/material";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton.tsx";
import { useFormik } from "formik";
import * as yup from "yup";
import { PASSWORD_RESET } from "constants/urls.ts";
import { getTextFieldProps } from "utils/formik/get-text-field-props.ts";
import { subsidiaryApi } from "apis/subsidiary.ts";
import { ReactNode } from "react";
import { LoadingButton } from "@mui/lab";

function AuthPasswordResetRequest(props: AuthPasswordResetRequestProps) {
  const { children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const [forgotPasswordSubsidiaryMutation] =
    subsidiaryApi.useForgotPasswordSubsidiaryMutation();

  const formik = useFormik<{ identifier: string }>({
    initialValues: {
      identifier: "",
    },
    validateOnMount: true,
    validationSchema: yup.object({
      identifier: yup.string().label("Email").email().trim().required(),
    }),
    onSubmit: async (values) => {
      try {
        const data = await forgotPasswordSubsidiaryMutation({
          body: {
            identifier: values.identifier,
          },
        }).unwrap();

        enqueueSnackbar(
          data?.message || "Password reset request sent successful",
          {
            variant: "success",
          }
        );
        navigate(PASSWORD_RESET, { state: { identifier: values.identifier } });
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
    },
  });

  function handleClose(e?: any, reason?: any) {
    onClose?.(e, reason);
    setOpen(false);
  }

  return (
    <>
      <Dialog
        component="form"
        onSubmit={formik.handleSubmit as any}
        open={isOpen}
        fullWidth
        {...restProps}
      >
        <DialogTitleXCloseButton
          onClose={handleClose}
          className="bg-primary-main text-primary-contrastText"
        >
          Reset password
        </DialogTitleXCloseButton>
        <DialogContent className="pt-6">
          <TextField
            fullWidth
            label="Email Address"
            placeholder="Enter your Email Address"
            {...getTextFieldProps(formik, "identifier")}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            loading={formik.isSubmitting}
            loadingPosition="end"
            endIcon={<></>}
          >
            Reset Password
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {typeof children === "function"
        ? children({ isOpen, toggleOpen, setOpen })
        : children}
    </>
  );
}

export default AuthPasswordResetRequest;

export type AuthPasswordResetRequestProps = {
  open?: boolean;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DialogProps, "children" | "open" | "id">;
