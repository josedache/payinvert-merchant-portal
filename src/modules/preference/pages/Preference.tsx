import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import { subsidiaryDashboardApi } from "apis/subsidiary-dashboard";
import { useMemo } from "react";
import { PreferencePaymentMethod } from "modules/preference/enums/preference-payment-method";
import useAuthUser from "hooks/use-auth-user";
import { useSnackbar } from "notistack";
import { Icon as Iconify } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import { getCheckFieldProps } from "utils/formik/get-check-field-props";

function Preference() {
  const { enqueueSnackbar } = useSnackbar();

  const authUser = useAuthUser();

  const [setAllSubsidiaryDashboardPaymentOptionsMutation] =
    subsidiaryDashboardApi.useSetAllSubsidiaryDashboardPaymentOptionsMutation();

  const [toggleSubsidiaryDashboardInternationalPaymentMutation] =
    subsidiaryDashboardApi.useToggleSubsidiaryDashboardInternationalPaymentMutation();

  const [setSubsidiaryDashboard2faLoginMutation] =
    subsidiaryDashboardApi.useSetSubsidiaryDashboard2faLoginMutation();

  const subsidiaryDashboardPaymentOptionsQueryResult =
    subsidiaryDashboardApi.useGetSubsidiaryDashboardPaymentOptionsQuery(
      undefined
    );

  const subsidiaryDashboardPaymentOptions =
    subsidiaryDashboardPaymentOptionsQueryResult.data?.data;

  const subsidiaryDashboardInternationalPaymentViewQueryResult =
    subsidiaryDashboardApi.useGetSubsidiaryDashboardInternationalPaymentViewQuery(
      undefined
    );

  const subsidiaryDashboardInternationalPaymentView =
    subsidiaryDashboardInternationalPaymentViewQueryResult.data?.data;

  const subsidiaryDashboard2faLoginQueryResult =
    subsidiaryDashboardApi.useGetSubsidiaryDashboard2faLoginQuery(undefined);

  //transaction fee section
  const subsidiaryDashboardWhoPayFeeQueryResult =
    subsidiaryDashboardApi.useGetSubsidiaryDashboardWhoPayFeeQuery(undefined);

  const [setSubsidiaryDashboardWhoPayFeeMutation] =
    subsidiaryDashboardApi.useSetSubsidiaryDashboardWhoPayFeeMutation();

  const subsidiaryDashboardWhoPay =
    subsidiaryDashboardWhoPayFeeQueryResult.data?.data;

  const subsidiaryDashboard2faLogin =
    subsidiaryDashboard2faLoginQueryResult.data?.data;

  const initialValues = useMemo(() => {
    return {
      paymentOptions:
        subsidiaryDashboardPaymentOptions?.map((item) => ({
          paymentOption: item.code,
          enabled: item.isEnabled,
        })) ?? [],
      enableInternationalPayment:
        subsidiaryDashboardInternationalPaymentView?.enabled ?? false,
      twoFA: subsidiaryDashboard2faLogin?.isTwoFAEnabled ?? false,
      feeBearer: subsidiaryDashboardWhoPay?.code || "",
    };
  }, [
    subsidiaryDashboardPaymentOptions,
    subsidiaryDashboardInternationalPaymentView,
    subsidiaryDashboard2faLogin,
  ]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      paymentOptions: yup.array().of(
        yup.object({
          paymentOption: yup.string().required(),
          enabled: yup.boolean().required(),
        })
      ),
      enableInternationalPayment: yup.boolean().required(),
      twoFA: yup.boolean().required(),
      feeBearer: yup.string().required(),
      // businessId: yup.string().required(),
      // percentage: yup.string().required(),
      // feeBearer: '',
      // businessId: '',
      // percentage: '',
    }),
    enableReinitialize: true,
    onSubmit: async () => {
      try {
        const [paymentOptionsData] = await Promise.all([
          setAllSubsidiaryDashboardPaymentOptionsMutation({
            body: {
              paymentOptions: formik.values.paymentOptions,
              businessId: authUser?.businessDetails?.id,
            },
          }).unwrap(),
          toggleSubsidiaryDashboardInternationalPaymentMutation({
            body: {
              enabled: formik.values.enableInternationalPayment,
              businessId: authUser?.businessDetails?.id,
            },
          }).unwrap(),
          setSubsidiaryDashboard2faLoginMutation({
            body: {
              twoFA: formik.values.twoFA,
            },
          }).unwrap(),
          setSubsidiaryDashboardWhoPayFeeMutation({
            body: {
              businessId: authUser?.businessDetails?.id,
              feeBearer: formik.values.feeBearer,
              percentage: "1.0",
            },
          }).unwrap(),
        ]);
        enqueueSnackbar(
          paymentOptionsData?.message || "Preferences updated successfully",
          {
            variant: "success",
          }
        );
      } catch (error) {
        enqueueSnackbar(
          error?.message ||
            error?.data?.message ||
            "Failed to update preferences. Please try again.",
          {
            variant: "error",
          }
        );
      }
    },
  });

  return (
    <>
      <div className="max-w-xl mx-auto">
        <Paper elevation={0} className="p-4 md:p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <Typography variant="h6">Transactions</Typography>
              <Typography variant="body1">
                Who pays the transaction fees?
              </Typography>
            </div>
            <RadioGroup {...getTextFieldProps(formik, "feeBearer")}>
              {[
                { value: "BBF", label: "I will pay the fees" },
                {
                  value: "CBF",
                  label: "My customers will pay the fees",
                },
              ].map((props) => (
                <FormControlLabel
                  key={props.label}
                  control={<Radio />}
                  {...props}
                />
              ))}
            </RadioGroup>
          </div>
          <Divider />
          <div className="space-y-4">
            <div>
              <Typography variant="h6">Payment configurations</Typography>
              <Typography variant="body1">
                Configure customer payment preferences
              </Typography>
            </div>
            <FormGroup>
              {formik.values.paymentOptions?.map((option, index) => {
                const formikKey = `paymentOptions.${index}.enabled`;
                return (
                  <FormControlLabel
                    key={option.paymentOption}
                    control={
                      <Checkbox {...getCheckFieldProps(formik, formikKey)} />
                    }
                    label={
                      {
                        [PreferencePaymentMethod.CARD]: "Enable card payment",
                        [PreferencePaymentMethod.USSD]: "Enable USSD",
                        [PreferencePaymentMethod.BANK_TRANSFER]:
                          "Enable bank transfer",
                        [PreferencePaymentMethod.QR_CODE]:
                          "Enable QR code payment",
                        ["INTERNATIONAL_PAYMENT"]:
                          "Enable international payment",
                      }[option.paymentOption] ?? option.paymentOption
                    }
                  />
                );
              })}
              <FormControlLabel
                control={
                  <Checkbox
                    {...getCheckFieldProps(
                      formik,
                      "enableInternationalPayment"
                    )}
                  />
                }
                label="Enable international payment"
              />
            </FormGroup>
          </div>
          <Divider />
          <div className="space-y-4">
            <div>
              <Typography variant="h6">Other preferences</Typography>
            </div>
            <FormGroup>
              {[
                {
                  key: "twoFA",
                  label: "Enable Two Factor Authentication for login",
                },
              ].map(({ key, ...props }) => (
                <FormControlLabel
                  key={props.label}
                  control={<Checkbox {...getCheckFieldProps(formik, key)} />}
                  {...props}
                />
              ))}
            </FormGroup>
          </div>
          <Divider />
          <LoadingButton
            startIcon={
              <Iconify icon="humbleicons:check" width="20" height="20" />
            }
            fullWidth
            loading={formik.isSubmitting}
            onClick={formik.handleSubmit as any}
          >
            Save
          </LoadingButton>
        </Paper>
      </div>
    </>
  );
}

export const Component = Preference;

export default Preference;
