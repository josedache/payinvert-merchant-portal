import { Button, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Icon } from "@iconify/react/dist/iconify.js";

import StepperIcon from "components/StepperIcon";
import useStepper from "hooks/use-stepper";
import { SettingComplianceFormikValues } from "../types/SettingComplianceForm";
import SettingsComplianceStep from "../enums/SettingsComplianceStep";
import SettingsComplianceAddEditProfile from "./SettingsComplianceAddEditProfile";
import SettingsComplianceAddEditBankDetails from "./SettingsComplianceAddEditBankDetails";
import SettingsComplianceAddEditKycDetails from "./SettingsComplianceAddEditKycDetails";
import SettingsComplianceAddEditDirectorsInfo from "./SettingsComplianceAddEditDirectorsInfo";
import useToggle from "hooks/use-toggle";
import clsx from "clsx";

type SettingComplianceAddEditProps = {
  isInitialOnboarding?: boolean;
};

export default function SettingComplianceAddEdit(
  props: SettingComplianceAddEditProps
) {
  const { isInitialOnboarding } = props;
  const { enqueueSnackbar } = useSnackbar();
  const stepper = useStepper();

  const [isEdit, toggleIsEdit] = useToggle();

  const getValidationSchemas = {
    // [SettingsComplianceStep.PROFILE]: {
    //   businessTypeId: yup.string().required("Business Type is required"),
    //   businessName: yup.string().email().required("Business Name is required"),
    //   countryId: yup.string().required("Country is required"),
    //   description: yup.string().required("Description is required"),
    //   industryId: yup.string().required("Industry is required"),
    //   bvn: yup.string().required("BVN is required"),
    // },
    // [SettingsComplianceStep.BANK_DETAILS]: {
    //   bankId: yup.string().required("Bank is required"),
    //   bankName: yup.string().required("Bank Name is required"),
    //   accountName: yup.string().required("Account Name is required"),
    //   accountNumber: yup
    //     .string()
    //     .matches(/^[0-9]+$/, "Account Number must be a number")
    //     .required("Account Number is required"),
    // },
    // [SettingsComplianceStep.DIRECTORS_INFO]: {
    //   IdNumber: yup.string().required("Id Number is required"),
    //   FullName: yup.string().required("Full Name is required"),
    //   directorIdentity: yup.string().required("Identity is required"),
    // },
    // [SettingsComplianceStep.KYC_DETAILS]: {
    //   KycIdentity: yup.string().required("KYC Identity is required"),
    //   ProofOfAddress: yup.string().required("Proof of Address is required"),
    // },
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

  const isPreview = !isInitialOnboarding && !isEdit;

  const contentProps = {
    isInitialOnboarding,
    isEdit,
    isPreview,
    formik,
    stepper,
  };
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
    <div
      className={clsx(
        isInitialOnboarding ? "" : "justify-between",
        "flex flex-col-reverse md:flex-row gap-4 md:gap-18"
      )}
    >
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

      {!isInitialOnboarding && (
        <div className="flex md:block justify-end">
          <Button
            onClick={toggleIsEdit}
            startIcon={<Icon icon="ic:outline-edit" width="20" height="20" />}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}

export const Component = SettingComplianceAddEdit;
