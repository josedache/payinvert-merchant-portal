import { ReactNode, useState } from "react";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { verificationApi } from "apis/verification";
import { useSnackbar } from "notistack";
import useStepper from "hooks/use-stepper";
import useToggle from "hooks/use-toggle";
import { LoadingButton } from "@mui/lab";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import NumberTextField from "components/NumberTextField";
import OtpInput from "components/OtpInput";
import NumberInput from "components/NumberInput";
import Countdown from "components/Countdown";

function PhoneVerification(props: PhoneVerificationProps) {
  const { initialStep, mobileNumber, children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const stepper = useStepper({ initialStep: initialStep });

  const [
    requestPhoneVerificationMutation,
    requestPhoneVerificationMutationResult,
  ] = verificationApi.useRequestPhoneVerificationMutation();

  const [validatePhoneVerificationMutation] =
    verificationApi.useValidatePhoneVerificationMutation();

  const [countdownDate, setCountdownDate] = useState(getCountdownDate);

  const formik = useFormik({
    initialValues: {
      mobileNumber: mobileNumber ?? "",
      otp: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      ...[
        {
          mobileNumber: yup.string().label("Mobile Number").required(),
        },
        { otp: yup.string().label("OTP").required() },
      ][stepper.step],
    }),
    onSubmit: async (values) => {
      switch (stepper.step) {
        case 0: {
          await sendOtp(values.mobileNumber);
          stepper.next();
          break;
        }
        case 1: {
          await validateOtp(values.otp);
          handleClose();
          break;
        }
        default: {
          break;
        }
      }
    },
  });

  async function sendOtp(mobileNumber: string) {
    try {
      const data = await requestPhoneVerificationMutation({
        path: { mobileNumber: mobileNumber },
      }).unwrap();

      setCountdownDate(getCountdownDate);

      enqueueSnackbar("An OTP has been sent to your email.", {
        variant: "success",
      });

      return data;
    } catch (error) {
      enqueueSnackbar(
        error?.data?.message || "Failed to send otp. Please try again.",
        { variant: "error" }
      );
    }
  }

  async function validateOtp(otp: string) {
    try {
      const data = await validatePhoneVerificationMutation({
        path: { otp: otp },
      }).unwrap();

      enqueueSnackbar("OTP validated successfully.", {
        variant: "success",
      });

      return data;
    } catch (error) {
      enqueueSnackbar(
        error?.data?.message || "Failed to validate otp. Please try again.",
        { variant: "error" }
      );
    }
  }

  function handleClose(e?: any, reason?: any) {
    formik.resetForm();
    onClose?.(e, reason);
    setOpen(false);
    stepper.reset();
  }

  return (
    <>
      <Dialog open={isOpen} fullWidth {...restProps}>
        <DialogTitle>
          {["Enter Phone Number", "Verify OTP"][stepper.step]}
        </DialogTitle>
        <DialogContent>
          <div className="grid gap-4 py-6">
            {
              [
                <>
                  <NumberTextField
                    freeSolo
                    maskOptions={{ min: 0, max: 11 }}
                    {...getTextFieldProps(formik, "mobileNumber")}
                    label="Phone Number"
                    fullWidth
                  />
                </>,
                <>
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
                                      requestPhoneVerificationMutationResult.isLoading
                                    }
                                    component={MuiLink}
                                    onClick={() =>
                                      sendOtp(formik.values.mobileNumber)
                                    }
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
                </>,
              ][stepper.step]
            }
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            loading={formik.isSubmitting}
            loadingPosition="end"
            endIcon={<></>}
            onClick={formik.handleSubmit as any}
            className="flex-1"
          >
            {["Proceed", "Confirm"][stepper.step]}
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {typeof children === "function"
        ? children({
            isOpen,
            toggleOpen,
            setOpen,
            sendOtp,
            validateOtp,
            formik,
            stepper,
          })
        : children}
    </>
  );
}

export default PhoneVerification;

function getCountdownDate() {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 5);
  return date;
}

export type PhoneVerificationProps = {
  initialStep?: number;
  mobileNumber?: string;
  open?: boolean;
  children?:
    | ReactNode
    | ((props: {
        formik: ReturnType<typeof useFormik>;
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
        sendOtp: (mobileNumber: string) => any;
        validateOtp: (otp: string) => any;
        stepper: ReturnType<typeof useStepper>;
      }) => any);
} & Omit<DialogProps, "children" | "open">;
