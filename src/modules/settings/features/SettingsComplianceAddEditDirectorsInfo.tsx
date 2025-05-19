import { Button, Paper, TextField } from "@mui/material";
import NumberTextField from "components/NumberTextField";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SettingsComplianceContentProps } from "../types/SettingComplianceForm";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import FileUploadInput from "components/FileUploadInput";
import { getTextFieldHelperTextAndError } from "utils/formik/get-text-field-helper-text-and-error";

type SettingsComplianceAddEditDirectorsInfoProps =
  {} & SettingsComplianceContentProps;

export default function SettingsComplianceAddEditDirectorsInfo(
  props: SettingsComplianceAddEditDirectorsInfoProps
) {
  const { isPreview, isInitialOnboarding, formik } = props;

  return (
    <Paper className="w-full max-w-xl p-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            {...getTextFieldProps(formik, "FullName")}
            label="Director's full"
            fullWidth
            disabled={isPreview}
            required
          />

          <TextField
            {...getTextFieldProps(formik, "directorIdentity")}
            label="Director's Id"
            fullWidth
            disabled={isPreview}
            required
          />

          <FileUploadInput
            label="Director's ID"
            onChange={(e) => {
              const file = e.target.files[0];
              formik.setFieldValue("directorIdentity", file);
            }}
            {...getTextFieldHelperTextAndError(formik, "directorIdentity")}
            required
            // slotProps={{
            //   input: {
            //     accept:
            //       ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
            //   },
            // }}
          />

          <NumberTextField
            freeSolo
            maskOptions={{ min: 0, max: 11 }}
            {...getTextFieldProps(formik, "IdNumber")}
            label="ID Number"
            fullWidth
            disabled={isPreview}
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
