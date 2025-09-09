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
import { Icon as Iconify } from "@iconify/react";
import { verificationApi } from "apis/verification";
import { useSnackbar } from "notistack";
import NoSpecialCharacterTextField from "components/NoSpecialCharaterTextField";

function ComplianceUpdateProfile(props: ComplianceUpdateProfileProps) {
  const {
    backButtonJsx,
    formik,
    isStartupBusiness,
    isRegisteredBusiness,
    complianceInfo,
    isView,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [
    validateRcNumberVerificationMutation,
    validateRcNumberVerificationMutationResult,
  ] = verificationApi.useValidateRcNumberVerificationMutation();

  async function handleValidateRcNumber() {
    const val = formik.values.registrationNumber.replace(/[\s-]/g, "");
    try {
      const data = await validateRcNumberVerificationMutation({
        path: { rcNumber: val },
      }).unwrap();

      enqueueSnackbar(data?.message || "RC number validated successfully.", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(
        error?.data?.message ||
          "Failed to validate RC number. Please try again.",
        { variant: "error" }
      );
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      className="w-full max-w-xl p-6 space-y-4"
    >
      {backButtonJsx}
      <Typography variant="h6" className="font-semibold">
        Profile Setup
      </Typography>

      <div className="grid grid-cols-1 gap-4">
        <TextField
          label="Business Name"
          fullWidth
          value={formik.values.businessName}
          disabled
          /*{...getTextFieldProps(formik, "businessName")}*/
          helperText={"As per official record"}
        />

        {isStartupBusiness ? (
          <NoSpecialCharacterTextField
            label="Business description"
            fullWidth
            disabled={isView}
            multiline
            rows={4}
            {...getTextFieldProps(formik, "description")}
          />
        ) : null}

        {isRegisteredBusiness ? (
          <>
            <TextField
              label="Business registration number"
              fullWidth
              disabled={isView}
              {...getTextFieldProps(
                formik,
                "registrationNumber",
                "Issued by the Corporate Affairs Commission (CAC)"
              )}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      {complianceInfo?.profileCompliance?.isBusinessVerified &&
                      complianceInfo?.profileCompliance?.registrationNumber ===
                        formik.values.registrationNumber ? (
                        <>
                          <Icon color="success">
                            <Iconify icon="ic:twotone-verified" />
                          </Icon>
                        </>
                      ) : !isView ? (
                        <>
                          <LoadingButton
                            size="small"
                            disabled={!formik.values.registrationNumber}
                            loading={
                              validateRcNumberVerificationMutationResult.isLoading
                            }
                            onClick={handleValidateRcNumber}
                          >
                            Verify
                          </LoadingButton>
                        </>
                      ) : null}
                    </InputAdornment>
                  ),
                },
              }}
            />
            <NoSpecialCharacterTextField
              label="Tax identification number (TIN)"
              fullWidth
              disabled={isView}
              {...getTextFieldProps(formik, "taxIdNumber")}
            />
          </>
        ) : null}
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

export type ComplianceUpdateProfileProps = {} & ComplianceUpdateContentProps;

export default ComplianceUpdateProfile;
