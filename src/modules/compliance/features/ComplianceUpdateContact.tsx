import { ComplianceUpdateContentProps } from "../types/compliance-update";
import {
  Icon,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import { LoadingButton } from "@mui/lab";
import EmailVerification from "features/EmailVerification";
import PhoneNumberVerification from "features/PhoneNumberVerification";
import { Icon as Iconify } from "@iconify/react";

function ComplianceUpdateContact(props: ComplianceUpdateContactProps) {
  const { formik, isStartupBusiness, complianceInfo, isView } = props;

  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      className="w-full max-w-xl p-6 space-y-4"
    >
      <Typography variant="h6" className="font-semibold">
        Contact Setup
      </Typography>

      <div className="grid grid-cols-1 gap-4">
        <TextField
          label={isStartupBusiness ? "Email address" : "Business email"}
          fullWidth
          disabled={isView}
          required
          {...getTextFieldProps(formik, "email")}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {complianceInfo?.contactCompliance?.isEmailVerified &&
                  complianceInfo?.contactCompliance?.emailAddress ===
                    formik.values.email ? (
                    <>
                      <Icon color="success">
                        <Iconify icon="ic:twotone-verified" />
                      </Icon>
                    </>
                  ) : !isView ? (
                    <EmailVerification email={formik.values.email}>
                      {({
                        formik: verificationFormik,
                        stepper,
                        sendOtp,
                        toggleOpen,
                      }) => (
                        <LoadingButton
                          size="small"
                          disabled={!verificationFormik.values.email}
                          loading={verificationFormik.isSubmitting}
                          onClick={async () => {
                            verificationFormik.setSubmitting(true);

                            const data = await sendOtp(formik.values.email);

                            if (data) {
                              stepper.next();
                              toggleOpen();
                            }

                            verificationFormik.setSubmitting(false);
                          }}
                        >
                          Verify
                        </LoadingButton>
                      )}
                    </EmailVerification>
                  ) : null}
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label={isStartupBusiness ? "Phone number" : "Business phone number"}
          fullWidth
          disabled={isView}
          required
          {...getTextFieldProps(formik, "verifiedPhoneNumber")}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {complianceInfo?.contactCompliance?.isPhoneVerified &&
                  complianceInfo?.contactCompliance?.phoneNumber ===
                    formik.values.verifiedPhoneNumber ? (
                    <>
                      <Icon color="success">
                        <Iconify icon="ic:twotone-verified" />
                      </Icon>
                    </>
                  ) : !isView ? (
                    <>
                      <PhoneNumberVerification
                        phoneNumber={formik.values.verifiedPhoneNumber}
                      >
                        {({
                          formik: verificationFormik,
                          stepper,
                          sendOtp,
                          toggleOpen,
                        }) => (
                          <LoadingButton
                            size="small"
                            disabled={!verificationFormik.values.phoneNumber}
                            loading={verificationFormik.isSubmitting}
                            onClick={async () => {
                              verificationFormik.setSubmitting(true);

                              const data = await sendOtp(
                                formik.values.verifiedPhoneNumber
                              );

                              if (data) {
                                stepper.next();
                                toggleOpen();
                              }

                              verificationFormik.setSubmitting(false);
                            }}
                          >
                            Verify
                          </LoadingButton>
                        )}
                      </PhoneNumberVerification>
                    </>
                  ) : null}
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label={isStartupBusiness ? "Physical address" : "Business address"}
          fullWidth
          disabled={isView}
          multiline
          rows={4}
          required
          {...getTextFieldProps(formik, "businessAddress")}
        />
      </div>

      {!isView ? (
        <LoadingButton
          startIcon={
            <Iconify icon="humbleicons:check" width="20" height="20" />
          }
          fullWidth
          type="submit"
          loading={formik.isSubmitting}
        >
          Save
        </LoadingButton>
      ) : null}
    </Paper>
  );
}

export type ComplianceUpdateContactProps = {} & ComplianceUpdateContentProps;

export default ComplianceUpdateContact;
