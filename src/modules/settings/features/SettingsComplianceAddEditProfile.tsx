import { SettingsComplianceContentProps } from "../types/SettingComplianceForm";
import { Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import NumberTextField from "components/NumberTextField";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import { subsidiaryApi } from "apis/subsidiary";

type SettingsComplianceAddEditProfileProps =
  {} & SettingsComplianceContentProps;

export default function SettingsComplianceAddEditProfile(
  props: SettingsComplianceAddEditProfileProps
) {
  const { isPreview, isInitialOnboarding, formik } = props;

  const getCountriesQuery = subsidiaryApi.useGetSubsidiaryDropdownQuery({
    path: { codeId: 17 },
  });
  const getBusinessTypeQuery = subsidiaryApi.useGetSubsidiaryDropdownQuery({
    path: { codeId: 24 },
  });
  const getIndustriesQuery = subsidiaryApi.useGetSubsidiaryDropdownQuery({
    path: { codeId: 25 },
  });

  const countries = getCountriesQuery?.data || [];
  const businessType = getBusinessTypeQuery?.data || [];
  const industries = getIndustriesQuery?.data || [];

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
          >
            {businessType?.map?.((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            {...getTextFieldProps(formik, "countryId")}
            label="Country"
            select
            fullWidth
            disabled={isPreview}
          >
            {countries?.map?.((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            {...getTextFieldProps(formik, "description")}
            label="Description"
            rows={3}
            multiline
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
          >
            {industries?.map?.((industry) => (
              <MenuItem key={industry.id} value={industry.id}>
                {industry.name}
              </MenuItem>
            ))}
          </TextField>
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
