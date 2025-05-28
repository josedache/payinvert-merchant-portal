import {
  Paper,
  Skeleton,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

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
import { subsidiaryApi } from "apis/subsidiary";
import LoadingContent from "components/LoadingContent";
import { useEffect } from "react";
import { DASHBOARD_ONBOARDING } from "constants/urls";
import { useNavigate } from "react-router-dom";

type SettingComplianceAddEditProps = {
  isInitialOnboarding?: boolean;
};

export default function SettingComplianceAddEdit(
  props: SettingComplianceAddEditProps
) {
  const { isInitialOnboarding } = props;
  const { enqueueSnackbar } = useSnackbar();
  const stepper = useStepper();
  const navigate = useNavigate();

  const [isEdit] = useToggle();

  const [updateComplianceProfileMutation] =
    subsidiaryApi.useUpdateSubsidiaryComplianceProfileMutation();
  const [updateComplianceBankMutation] =
    subsidiaryApi.useUpdateSubsidiaryComplianceBankMutation();
  const [updateComplianceDirectorMutation] =
    subsidiaryApi.useUpdateSubsidiaryComplianceDirectorMutation();
  const [updateComplianceKycDetailsMutation] =
    subsidiaryApi.useUpdateSubsidiaryComplianceKycDetailsMutation();

  const getComplianceInfoQuery =
    subsidiaryApi.useGetSubsidiaryComplianceInfoQuery();
  const complianceInfo = getComplianceInfoQuery?.data;

  const getValidationSchemas = {
    [SettingsComplianceStep.PROFILE]: {
      businessTypeId: yup
        .string()
        .label("Business type")
        .required("Business Type is required"),
      businessName: yup
        .string()
        .label("Business Name")
        .required("Business Name is required"),
      countryId: yup.string().label("Country").required("Country is required"),
      description: yup.string().required("Description is required"),
      industryId: yup
        .string()
        .label("Industry")
        .required("Industry is required"),
      bvn: yup.string().required("BVN is required"),
    },
    [SettingsComplianceStep.BANK_DETAILS]: {
      bankId: yup.string().label("Bank").required("Bank is required"),
      bankName: yup
        .string()
        .label("Bank Name")
        .required("Bank Name is required"),
      accountName: yup.string().required("Account Name is required"),
      accountNumber: yup
        .string()
        .label("Account Number")
        .matches(/^[0-9]+$/, "Account Number must be a number")
        .required("Account Number is required"),
    },
    [SettingsComplianceStep.DIRECTORS_INFO]: {
      IdNumber: yup
        .string()
        .label("ID Number")
        .required("Id Number is required"),
      FullName: yup.string().required("Full Name is required"),
      directorIdentity: yup.string().required("Identity is required"),
    },
    [SettingsComplianceStep.KYC_DETAILS]: {
      KycIdentity: yup
        .string()
        .label("KYC Identity")
        .required("KYC Identity is required"),
      ProofOfAddress: yup
        .string()
        .label("Proof of Address")
        .required("Proof of Address is required"),
    },
  }[stepper.step];

  const formik = useFormik<SettingComplianceFormikValues>({
    initialValues: {
      businessTypeId:
        complianceInfo?.profileCompliance?.businessType?.id || ("" as never),
      countryId:
        complianceInfo?.profileCompliance?.country?.id || ("" as never),
      description: complianceInfo?.profileCompliance?.description || "",
      businessName: complianceInfo?.profileCompliance?.businessName || "",
      bvn: complianceInfo?.profileCompliance?.bvn || "",
      industryId:
        complianceInfo?.profileCompliance?.industry?.id || ("" as never),

      bankId:
        (complianceInfo?.bankCompliance?.bankId as never) || ("" as never),
      bankName: complianceInfo?.bankCompliance?.bankName || "bank name", // TODO: revers back when bank enquiry is completed
      // accountName: complianceInfo?.bankCompliance?.accountName || null,
      accountName: complianceInfo?.profileCompliance?.businessName || "", // TODO: revers back when bank enquiry is completed
      accountNumber: complianceInfo?.bankCompliance?.accountNumber || "",

      IdNumber: complianceInfo?.directorCompliance?.idNumber || "",
      FullName: complianceInfo?.directorCompliance?.fullName || "",
      directorIdentity: complianceInfo?.directorCompliance?.identity || "",

      KycIdentity:
        complianceInfo?.kycDetailsCompliance?.meansOfIdentification || "",
      ProofOfAddress:
        complianceInfo?.kycDetailsCompliance?.proofOfAddress || "",
    },
    validationSchema: yup.object({
      ...getValidationSchemas,
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        switch (stepper.step) {
          case SettingsComplianceStep.PROFILE: {
            await updateComplianceProfileMutation({
              body: {
                businessTypeId: values?.businessTypeId,
                countryId: values?.countryId,
                description: values?.description,
                businessName: values?.businessName,
                bvn: values?.bvn,
                industryId: values?.industryId,
              },
            }).unwrap();
            stepper.go(SettingsComplianceStep.BANK_DETAILS);
            break;
          }
          case SettingsComplianceStep.BANK_DETAILS: {
            await updateComplianceBankMutation({
              body: {
                bankId: values?.bankId,
                bankName: values?.bankName,
                accountName: values?.accountName,
                accountNumber: values?.accountNumber,
              },
            }).unwrap();
            stepper.next();
            break;
          }
          case SettingsComplianceStep.DIRECTORS_INFO: {
            await updateComplianceDirectorMutation({
              body: {
                IdNumber: values?.IdNumber,
                FullName: values?.FullName,
                Identity: values?.directorIdentity,
              },
            }).unwrap();
            stepper.next();
            break;
          }
          case SettingsComplianceStep.KYC_DETAILS: {
            await updateComplianceKycDetailsMutation({
              body: {
                Identity: values?.KycIdentity,
                ProofOfAddress: values?.ProofOfAddress,
              },
            }).unwrap();
            navigate(DASHBOARD_ONBOARDING);
            enqueueSnackbar("Compliance Submitted and pending approval", {
              variant: "success",
            });
            break;
          }
        }
      } catch (error) {
        enqueueSnackbar(error?.message || error?.data?.message || "Failed", {
          variant: "error",
        });
      }
    },
  });

  const isPreview =
    (!isInitialOnboarding && !isEdit) ||
    complianceInfo?.[Object.keys(complianceInfo || {})[stepper.step]]
      ?.compliancePercentage >= 100;

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

  useEffect(() => {
    if (isInitialOnboarding) {
      const isStepComplete = (step: number): boolean =>
        Number(
          complianceInfo?.[Object.keys(complianceInfo || {})[step]]
            ?.compliancePercentage
        ) >= 100;

      const findNextIncompleteStep = (step: number): number =>
        isStepComplete(step) ? findNextIncompleteStep(step + 1) : step;

      const nextStep = findNextIncompleteStep(stepper.step);

      if (nextStep >= steps.length) {
        navigate(DASHBOARD_ONBOARDING);
      } else {
        stepper.go(nextStep);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complianceInfo]);

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
          {steps.map((step, stepIndex) => (
            <Step key={step.label}>
              <StepLabel
                onClick={() => {
                  if (!isInitialOnboarding) {
                    stepper.go(stepIndex);
                  }
                }}
                className={clsx(!isInitialOnboarding && "cursor-pointer")}
                StepIconComponent={StepperIcon}
              >
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
        <LoadingContent
          loading={getComplianceInfoQuery.isLoading}
          renderLoading={() => (
            <Paper className="w-full max-w-xl p-6">
              <div className="grid grid-cols-1 gap-4">
                {Array(5)
                  .fill(5)
                  .map((i) => (
                    <Skeleton
                      variant="rounded"
                      className="w-full h-[50px]"
                      key={i}
                    />
                  ))}
              </div>
            </Paper>
          )}
        >
          {steps[stepper.step].content}
        </LoadingContent>
      </div>

      {!isInitialOnboarding && (
        <div className="flex md:block justify-end">
          {/* <Button
            onClick={toggleIsEdit}
            startIcon={<Icon icon="ic:outline-edit" width="20" height="20" />}
          >
            Edit
          </Button> */}
        </div>
      )}
    </div>
  );
}

export const Component = SettingComplianceAddEdit;
