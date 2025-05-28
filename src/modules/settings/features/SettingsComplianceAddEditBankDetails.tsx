import { Button, MenuItem, Paper, TextField } from "@mui/material";
import NumberTextField from "components/NumberTextField";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SettingsComplianceContentProps } from "../types/SettingComplianceForm";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import { subsidiaryApi } from "apis/subsidiary";

type SettingsComplianceAddEditBankDetailsProps =
  {} & SettingsComplianceContentProps;

export default function SettingsComplianceAddEditBankDetails(
  props: SettingsComplianceAddEditBankDetailsProps
) {
  const { isPreview, isInitialOnboarding, formik } = props;
  const getBanksQuery = subsidiaryApi.useGetSubsidiaryBanksQuery();
  const banks = getBanksQuery?.data?.banks || [];

  return (
    <Paper className="w-full max-w-xl p-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <NumberTextField
            freeSolo
            maskOptions={{ min: 0, max: 10 }}
            {...getTextFieldProps(formik, "accountNumber")}
            label="Account Number"
            fullWidth
            disabled={isPreview}
          />

          <TextField
            {...getTextFieldProps(formik, "bankId")}
            label="Bank"
            select
            fullWidth
            disabled={isPreview}
          >
            {banks?.map?.((bank) => (
              <MenuItem key={bank.id} value={bank.id}>
                {bank.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Bank Name"
            {...getTextFieldProps(formik, "bankName")}
            fullWidth
            disabled={isPreview}
          />

          <TextField
            {...getTextFieldProps(formik, "accountName")}
            label="Account Name"
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
            loading={formik.isSubmitting}
          >
            {isInitialOnboarding ? "Save and Continue" : "Save"}
          </Button>
        ) : null}
      </form>
    </Paper>
  );
}
