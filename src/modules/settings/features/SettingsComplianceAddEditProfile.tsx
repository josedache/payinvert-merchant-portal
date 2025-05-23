import { SettingsComplianceContentProps } from "../types/SettingComplianceForm";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import NumberTextField from "components/NumberTextField";
import { getTextFieldProps } from "utils/formik/get-text-field-props";

type SettingsComplianceAddEditProfileProps =
  {} & SettingsComplianceContentProps;

export default function SettingsComplianceAddEditProfile(
  props: SettingsComplianceAddEditProfileProps
) {
  const { isPreview, isInitialOnboarding, formik } = props;
  return (
    <Paper className="w-full max-w-xl p-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <Typography variant="h6" className="font-semibold">
            Profile
          </Typography>

          <TextField
            {...getTextFieldProps(formik, "businessTypeId")}
            label="Business Type"
            select
            fullWidth
            disabled={isPreview}
          />
          <TextField
            {...getTextFieldProps(formik, "businessEmail")}
            label="Business Email"
            fullWidth
            disabled={isPreview}
          />

          <TextField
            {...getTextFieldProps(formik, "countryId")}
            label="Country"
            select
            fullWidth
            disabled={isPreview}
          />
          <TextField
            {...getTextFieldProps(formik, "description")}
            label="Description"
            rows={3}
            fullWidth
            disabled={isPreview}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 mt-10">
          <Typography variant="h6" className="font-semibold">
            Registration
          </Typography>
          <TextField
            {...getTextFieldProps(formik, "businessName")}
            label="Legal Business Name"
            fullWidth
            disabled={isPreview}
          />

          <NumberTextField
            freeSolo
            maskOptions={{ min: 0, max: 11 }}
            {...getTextFieldProps(formik, "bvn")}
            label="BVN"
            fullWidth
            disabled={isPreview}
          />

          <TextField
            {...getTextFieldProps(formik, "industryId")}
            label="Industry"
            fullWidth
            disabled={isPreview}
            select
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
