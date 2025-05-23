import { Button, Paper } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SettingsComplianceContentProps } from "../types/SettingComplianceForm";
import { getTextFieldHelperTextAndError } from "utils/formik/get-text-field-helper-text-and-error";
import FileUploadInput from "components/FileUploadInput";

type SettingsComplianceAddEditKycDetailsProps =
  {} & SettingsComplianceContentProps;

export default function SettingsComplianceAddEditKycDetails(
  props: SettingsComplianceAddEditKycDetailsProps
) {
  const { isPreview, isInitialOnboarding, formik } = props;

  return (
    <Paper className="w-full max-w-xl p-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <FileUploadInput
            label="Means of identification"
            onChange={(e) => {
              const file = e.target.files[0];
              formik.setFieldValue("KycIdentity", file);
            }}
            {...getTextFieldHelperTextAndError(formik, "KycIdentity")}
            disabled={isPreview}
            inputProps={{
              accept: "image/*,application/pdf",
            }}
          />

          <FileUploadInput
            label="Proof of address"
            onChange={(e) => {
              const file = e.target.files[0];
              formik.setFieldValue("ProofOfAddress", file);
            }}
            {...getTextFieldHelperTextAndError(formik, "ProofOfAddress")}
            disabled={isPreview}
            // slotProps={{
            //   input: {
            //     accept:
            //       ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
            //   },
            // }}
          />
        </div>

        {!isPreview ? (
          <Button
            startIcon={<Icon icon="humbleicons:check" width="20" height="20" />}
            fullWidth
            size="large"
            className="mt-10"
            type="submit"
          >
            {isInitialOnboarding ? "Save and Continue" : "Save"}
          </Button>
        ) : null}
      </form>
    </Paper>
  );
}
