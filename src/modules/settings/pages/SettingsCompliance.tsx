import { Button, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

import StepperIcon from "components/StepperIcon";
import useStepper from "hooks/use-stepper";
import { SettingComplianceFormikValues } from "../types/SettingComplianceForm";
import SettingsComplianceStep from "../enums/SettingsComplianceStep";
import SettingsComplianceAddEditProfile from "../features/SettingsComplianceAddEditProfile";
import SettingsComplianceAddEditBankDetails from "../features/SettingsComplianceAddEditBankDetails";
import SettingsComplianceAddEditDirectorsInfo from "../features/SettingsComplianceAddEditDirectorsInfo";
import SettingsComplianceAddEditKycDetails from "../features/SettingsComplianceAddEditKycDetails";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SettingsCompliance() {
  const { enqueueSnackbar } = useSnackbar();
  const stepper = useStepper();

  const getValidationSchemas = {
    [stepper.step]: {},
  }[stepper.step];

  const formik = useFormik<SettingComplianceFormikValues>({
    initialValues: {},
    validationSchema: yup.object({
      ...getValidationSchemas,
    }),
    onSubmit: async (values) => {
      try {
        switch (stepper.step) {
          case SettingsComplianceStep.PROFILE: {
            stepper.go(SettingsComplianceStep.BANK_DETAILS);

            break;
          }
          case SettingsComplianceStep.BANK_DETAILS: {
            stepper.next();
            break;
          }
          case SettingsComplianceStep.DIRECTORS_INFO: {
            stepper.next();
            break;
          }
          case SettingsComplianceStep.KYC_DETAILS: {
            stepper.next();
            break;
          }
        }
        console.error(values);
      } catch (error) {
        enqueueSnackbar(error?.message || error?.data?.message || "Failed", {
          variant: "error",
        });
      }
    },
  });

  const contentProps = { formik, stepper };
  const steps = [
    {
      label: "Profile",
      content: <SettingsComplianceAddEditProfile {...contentProps} />,
    },
    {
      label: "Bank Details",
      content: <SettingsComplianceAddEditBankDetails {...contentProps} />,
    },
    {
      label: "Director's Information",
      content: <SettingsComplianceAddEditDirectorsInfo {...contentProps} />,
    },
    {
      label: "KYC Details",
      content: <SettingsComplianceAddEditKycDetails {...contentProps} />,
    },
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between gap-4 md:gap-18">
      <div>
        <Stepper
          activeStep={stepper.step}
          orientation="vertical"
          className="px-4"
        >
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={StepperIcon}>
                {step.label}
              </StepLabel>
              <StepContent className="block md:hidden">
                <div className="w-full max-w-xl">
                  {steps[stepper.step].content}
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="w-full max-w-xl md:block hidden">
        {steps[stepper.step].content}
      </div>

      <div className="flex md:block justify-end">
        <Button
          startIcon={<Icon icon="ic:outline-edit" width="20" height="20" />}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

export const Component = SettingsCompliance;
