import { ComplianceUpdateContentProps } from "../types/compliance-update";
import {
  Alert,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import { LoadingButton } from "@mui/lab";
import { Icon as Iconify } from "@iconify/react";
import NoSpecialCharacterTextField from "components/NoSpecialCharaterTextField";
import { getCheckFieldProps } from "utils/formik/get-check-field-props";
import ComplianceUpdateAgreementDocument from "modules/compliance/features/ComplianceUpdateAgreementDocument";
import { ComplianceAgreementDocumentType } from "modules/compliance/enums/compliance-agreement-document-type";

function ComplianceUpdateAgreement(props: ComplianceUpdateAgreementProps) {
  const { formik, isView } = props;

  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      className="w-full max-w-xl p-6 space-y-4"
    >
      <Typography variant="h6" className="font-semibold">
        Agreement
      </Typography>

      <div className="space-y-4">
        <div>
          <FormControlLabel
            className="ml-0 mr-0"
            labelPlacement="start"
            label="Accept terms of Service (TOS)"
            control={
              <Checkbox
                {...getCheckFieldProps(formik, "termOfServiceSigned")}
              />
            }
            {...props}
          />
          <ComplianceUpdateAgreementDocument
            type={ComplianceAgreementDocumentType.MSA}
            onCancel={() => formik.setFieldValue("msaSigned", false)}
            onAccept={() => formik.setFieldValue("msaSigned", true)}
          >
            {({ toggleOpen }) => (
              <FormControlLabel
                disabled={!formik.values.termOfServiceSigned}
                className="ml-0 mr-0"
                labelPlacement="start"
                label="Read and accept Payinvert Merchant Service E-Agreement"
                control={
                  <Checkbox
                    checked={formik.values.msaSigned}
                    onChange={(e) => {
                      if (e.target.checked) {
                        toggleOpen();
                      } else {
                        formik.setFieldValue("msaSigned", e.target.checked);
                      }
                    }}
                  />
                }
              />
            )}
          </ComplianceUpdateAgreementDocument>
          <ComplianceUpdateAgreementDocument
            type={ComplianceAgreementDocumentType.SLA}
            onCancel={() => formik.setFieldValue("slaSigned", false)}
            onAccept={() => formik.setFieldValue("slaSigned", true)}
          >
            {({ toggleOpen }) => (
              <FormControlLabel
                disabled={!formik.values.msaSigned}
                className="ml-0 mr-0"
                labelPlacement="start"
                label="Read and accept Payinvert Service Level Agreement"
                control={
                  <Checkbox
                    checked={formik.values.slaSigned}
                    onChange={(e) => {
                      if (e.target.checked) {
                        toggleOpen();
                      } else {
                        formik.setFieldValue("slaSigned", e.target.checked);
                      }
                    }}
                  />
                }
              />
            )}
          </ComplianceUpdateAgreementDocument>
        </div>

        <Divider />
        <div className="space-y-2">
          <NoSpecialCharacterTextField
            label="Full name"
            fullWidth
            disabled={isView || !formik.values.termOfServiceSigned}
            {...getTextFieldProps(formik, "signedBy")}
          />
          <Alert severity="info">
            The full name must match one of the directors name
          </Alert>
        </div>
      </div>
      {!isView ? (
        <LoadingButton
          startIcon={
            <Iconify icon="humbleicons:check" width="20" height="20" />
          }
          fullWidth
          type="submit"
          loading={formik.isSubmitting}
          disabled={
            !(
              formik.values.termOfServiceSigned &&
              formik.values.msaSigned &&
              formik.values.slaSigned &&
              formik.values.signedBy
            )
          }
        >
          Accept my business
        </LoadingButton>
      ) : null}
    </Paper>
  );
}

export type ComplianceUpdateAgreementProps = {} & ComplianceUpdateContentProps;

export default ComplianceUpdateAgreement;
