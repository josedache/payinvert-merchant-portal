import { ComplianceUpdateContentProps } from "../types/compliance-update";
import { Icon, InputAdornment, Paper, Typography } from "@mui/material";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import { LoadingButton } from "@mui/lab";
import EmailVerification from "features/EmailVerification";
import PhoneNumberVerification from "features/PhoneVerification";
import { Icon as Iconify } from "@iconify/react";
import NoSpecialCharacterTextField from "components/NoSpecialCharaterTextField";
import PhoneNumberTextField from "components/PhoneNumberTextField";
import getPhoneNumberInfo from "utils/number/get-phone-number-info";

function ComplianceUpdateContact(props: ComplianceUpdateContactProps) {
  const { backButtonJsx, formik, isStartupBusiness, complianceInfo, isView } =
    props;

  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      className="w-full max-w-xl p-6 space-y-4"
    >
      <div className="flex items-center gap-1">
        {backButtonJsx}
        <Typography variant="h6" className="font-semibold">
          Contact Setup
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <NoSpecialCharacterTextField
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
        <PhoneNumberTextField
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
                  (complianceInfo?.contactCompliance?.phoneNumber ===
                    formik.values.verifiedPhoneNumber ||
                    complianceInfo?.contactCompliance?.phoneNumber ===
                      getPhoneNumberInfo(formik.values.verifiedPhoneNumber)
                        ?.nationalNumberNormalized) ? (
                    <>
                      <Icon color="success">
                        <Iconify icon="ic:twotone-verified" />
                      </Icon>
                    </>
                  ) : !isView ? (
                    <>
                      <PhoneNumberVerification
                        mobileNumber={formik.values.verifiedPhoneNumber}
                      >
                        {({
                          formik: verificationFormik,
                          stepper,
                          sendOtp,
                          toggleOpen,
                        }) => (
                          <LoadingButton
                            size="small"
                            disabled={!verificationFormik.values.mobileNumber}
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
        <NoSpecialCharacterTextField
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
