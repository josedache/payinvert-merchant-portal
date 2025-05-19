import { Button, Paper, TextField } from "@mui/material";
import NumberTextField from "components/NumberTextField";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SettingsComplianceContentProps } from "../types/SettingComplianceForm";
import { getTextFieldProps } from "utils/formik/get-text-field-props";

type SettingsComplianceAddEditBankDetailsProps =
  {} & SettingsComplianceContentProps;

export default function SettingsComplianceAddEditBankDetails(
  props: SettingsComplianceAddEditBankDetailsProps
) {
  const { formik } = props;

  return (
    <Paper className="w-full max-w-xl p-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            {...getTextFieldProps(formik, "directorFullName")}
            label="Account Number"
            fullWidth
          />

          <NumberTextField
            freeSolo
            maskOptions={{ min: 0, max: 11 }}
            {...getTextFieldProps(formik, "bankName")}
            label="Bank Name"
            fullWidth
          />

          <TextField
            {...getTextFieldProps(formik, "accountName")}
            label="Account Name"
            fullWidth
            select
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
