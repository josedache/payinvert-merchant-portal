import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import {
  ButtonBase,
  Paper,
  Typography,
  Link as MuiLink,
  DialogProps,
  Dialog,
  Button,
  DialogContent,
} from "@mui/material";
import { getTextFieldProps } from "utils/formik/get-text-field-props.ts";
import * as yup from "yup";
import useStepper from "hooks/use-stepper.ts";
import { Fragment, useState } from "react";
import Countdown from "components/Countdown";
import { LoadingButton } from "@mui/lab";
import OtpInput from "components/OtpInput";
import NumberInput from "components/NumberInput";
import { generatePath, useNavigate } from "react-router-dom";
import { TRANSACTION } from "constants/urls.ts";
import CurrencyTextField from "components/CurrencyTextField";
import { Check } from "assets/icons";
import { subsidiaryApi } from "apis/subsidiary";
import currency from "currency.js";
import { payoutApi } from "apis/payout";
import LoadingContent from "components/LoadingContent";
import useAuthUser from "hooks/use-auth-user";

type WalletMakePayoutDialogProps = {
  open?: boolean;
  onClose?: () => void;
} & DialogProps;
function WalletMakePayoutDialog(props: WalletMakePayoutDialogProps) {
  const { open, onClose, ...restProps } = props;
  const [countdownDate, setCountdownDate] = useState(getCountdownDate);
  const authUser = useAuthUser();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const stepper = useStepper();

  const getComplianceInfoQuery =
    subsidiaryApi.useGetSubsidiaryComplianceInfoQuery();
  const complianceInfo = getComplianceInfoQuery?.data;

  const getDashboardChartQuery =
    subsidiaryApi.useGetSubsidiaryDashboardChartQuery({
      params: { ChartFilter: "Week" },
    });
  const availableBalance =
    getDashboardChartQuery?.data?.availableBalance?.data || 0;

  const [initiatePayoutMutation, initiatePayoutMutationResult] =
    payoutApi.useInitiateNewPayoutMutation();
  const [verifyPayoutMutation] = payoutApi.useVerifyNewPayoutMutation();

  const formik = useFormik({
    initialValues: {
      amount: "",
      otp: "",
    },
    validationSchema: yup.object({
      ...[
        {
          amount: yup
            .number()
            .label("Amount")
            .max(availableBalance, "Amount must be less than wallet balance")
            .required(),
        },
        {
          otp: yup.string().label("OTP").length(6).trim().required(),
        },
        {},
      ][stepper.step],
    }),
    onSubmit: async (values) => {
      try {
        switch (stepper.step) {
          case 0: {
            await initiatePayoutMutation({
              body: {
                amount: Number(values.amount || 0),
              },
            }).unwrap();
            setCountdownDate(getCountdownDate());
            stepper.next();
            break;
          }
          case 1: {
            await verifyPayoutMutation({
              body: {
                otp: values.otp,
                amount: Number(values.amount || 0),
                reference:
                  initiatePayoutMutationResult?.data?.data
                    ?.transactionReference,
              },
            }).unwrap();
            stepper.next();
            break;
          }
          case 2: {
            navigate(
              //   generatePath(TRANSACTION_DETAIL, {
              //     id: String(initiatePayoutMutationResult?.data?.data?.id),
              //   })
              generatePath(TRANSACTION)
            );
            break;
          }
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

  function sendOtp() {}

  const step1 = (
    <Fragment key={0}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6">Payout</Typography>
        <div className="mt-2">
          <CurrencyTextField
            fullWidth
            label="Amount"
            {...getTextFieldProps(formik, "amount")}
          />
          <div className="flex justify-between w-full mt-1">
            <Typography variant="caption" color="success">
              +N25(Processing fee)
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Wallet balance:{" "}
              <span className="font-semibold">
                {currency(availableBalance || 0, {
                  symbol: "₦",
                }).format()}
              </span>
            </Typography>
          </div>
        </div>
        <div className="mt-4">
          <Typography variant="body2">Payout Bank Details</Typography>
          <Paper elevation={0} className="bg-[#F4F7EE] px-4 py-3 mt-2">
            <Typography className="font-semibold">
              {complianceInfo?.bankCompliance?.accountName || "N/A"}
            </Typography>
            <div className="flex gap-2 mt-1">
              <Typography
                variant="body2"
                className="text-[#424242] font-semibold"
              >
                {complianceInfo?.bankCompliance?.accountNumber || "N/A"}
              </Typography>
              <Typography
                variant="body2"
                className="text-[#616161] font-semibold"
              >
                {complianceInfo?.bankCompliance?.bankName || "N/A"}
              </Typography>
            </div>
          </Paper>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2">
          <Button
            onClick={onClose}
            color="inherit"
            variant="outlined"
            fullWidth
          >
            cancel
          </Button>
          <LoadingButton loading={formik.isSubmitting} type="submit" fullWidth>
            Make Payment
          </LoadingButton>
        </div>
      </form>
    </Fragment>
  );

  const step2 = (
    <Fragment key={1}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6">Verify OTP</Typography>

        <div className="mt-2">
          <Typography
            variant="body1"
            className="font-medium  text-text-secondary"
          >
            Enter the <b>6-digit</b> code sent to your email address
            <b> {authUser?.user?.emailAddress}</b> to withdraw{" "}
            <b>
              {currency(formik.values.amount || 0, {
                symbol: "₦",
              }).format()}
            </b>{" "}
            to your bank account.
          </Typography>
        </div>
        {
          <div className="grid gap-4 my-4">
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
            {!!formik === false && (
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
                        <Typography className="text-center">
                          Didn’t receive code?{" "}
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
                              // disabled={
                              //   signupYieldUserMutationResult?.isLoading
                              // }
                              component={MuiLink}
                              onClick={sendOtp}
                              className=""
                            >
                              Resend OTP
                            </ButtonBase>
                          )}
                        </Typography>
                      </div>
                    </>
                  );
                }}
              </Countdown>
            )}
          </div>
        }
        <div className="mt-10 grid grid-cols-2 gap-2">
          <Button
            onClick={onClose}
            color="inherit"
            variant="outlined"
            fullWidth
          >
            cancel
          </Button>
          <LoadingButton loading={formik.isSubmitting} type="submit" fullWidth>
            Confirm
          </LoadingButton>
        </div>
      </form>
    </Fragment>
  );

  const step3 = (
    <Fragment key={1}>
      <form onSubmit={formik.handleSubmit}>
        <Check />

        <Typography variant="h6" className="mt-2">
          Payment Successful
        </Typography>

        <div className="mt-2">
          <Typography
            variant="body1"
            className="font-medium text-text-secondary"
          >
            Your transfer of{" "}
            <b>
              {" "}
              {currency(formik.values.amount || 0, {
                symbol: "₦",
              }).format()}
            </b>{" "}
            to your bank account{" "}
            <b>{complianceInfo?.bankCompliance?.accountNumber || "N/A"}</b> was
            successful.
          </Typography>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2">
          <Button
            onClick={onClose}
            color="inherit"
            variant="outlined"
            fullWidth
          >
            cancel
          </Button>
          <LoadingButton loading={formik.isSubmitting} type="submit" fullWidth>
            View Receipt
          </LoadingButton>
        </div>
      </form>
    </Fragment>
  );

  return (
    <Dialog
      {...restProps}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogContent className="px-4">
        <LoadingContent
          loading={
            getComplianceInfoQuery.isLoading ||
            getDashboardChartQuery?.isLoading
          }
          error={
            getComplianceInfoQuery.isError || getDashboardChartQuery?.isError
          }
        >
          {[step1, step2, step3][stepper.step]}
        </LoadingContent>
      </DialogContent>
    </Dialog>
  );
}

export default WalletMakePayoutDialog;

export const Component = WalletMakePayoutDialog;

function getCountdownDate() {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 10);
  return date;
}
