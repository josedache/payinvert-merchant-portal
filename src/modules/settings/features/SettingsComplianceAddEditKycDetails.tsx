import { Button, Paper, TextField } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SettingsComplianceContentProps } from "../types/SettingComplianceForm";
import { getTextFieldProps } from "utils/formik/get-text-field-props";

type SettingsComplianceAddEditKycDetailsProps =
  {} & SettingsComplianceContentProps;

export default function SettingsComplianceAddEditKycDetails(
  props: SettingsComplianceAddEditKycDetailsProps
) {
  const { formik } = props;

  return (
    <Paper className="w-full max-w-xl p-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            {...getTextFieldProps(formik, "directorFullName")}
            label="Director's full"
            fullWidth
            required
          />
        </div>

        <Button
          startIcon={<Icon icon="humbleicons:check" width="20" height="20" />}
          fullWidth
          size="large"
          className="mt-10"
          type="submit"
        >
          Save and Continue
        </Button>
      </form>
    </Paper>
  );
}
