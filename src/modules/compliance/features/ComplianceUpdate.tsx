import {
  Icon,
  IconButton,
  Paper,
  Skeleton,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import useStepper from "hooks/use-stepper";
import { ComplianceUpdateFormikValues } from "modules/compliance/types/compliance-update";
import ComplianceUpdateStep from "../enums/compliance-update-step";
import ComplianceUpdateBusinessType from "modules/compliance/features/ComplianceUpdateBusinessType";
import ComplianceUpdateProfile from "./ComplianceUpdateProfile";
import ComplianceUpdateContact from "modules/compliance/features/ComplianceUpdateContact";
import ComplianceUpdateOwnerInfo from "modules/compliance/features/ComplianceUpdateOwnerInfo";
import ComplianceUpdateBusinessRegistration from "modules/compliance/features/ComplianceUpdateBusinessRegistration";
import ComplianceUpdateBankInfo from "modules/compliance/features/ComplianceUpdateBankInfo";
import ComplianceUpdateAgreement from "modules/compliance/features/ComplianceUpdateAgreement";
import clsx from "clsx";
import { subsidiaryApi } from "apis/subsidiary";
import LoadingContent from "components/LoadingContent";
import { useMemo } from "react";
import { COMPLIANCE } from "constants/urls";
import { Navigate, useNavigate } from "react-router-dom";
import { ComplianceBusinessType } from "modules/compliance/enums/compliance-business-type";
import MediaBreakpoint from "enums/media-breakpoint";
import useDataRef from "hooks/use-data-ref";
import getPhoneNumberInfo from "utils/number/get-phone-number-info";
import getPhoneNumberTest from "utils/formik/get-phone-number-test";

function ComplianceUpdate(props: ComplianceUpdateProps) {
  const { isView } = props;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const ismd = useMediaQuery(MediaBreakpoint.MD);

  const [updateComplianceProfileMutation] =
    subsidiaryApi.useUpdateSubsidiaryComplianceProfileMutation();

  const [updateComplianceContactMutation] =
    subsidiaryApi.useUpdateSubsidiaryComplianceContactMutation();

  const [updateComplianceBankMutation] =
    subsidiaryApi.useUpdateSubsidiaryComplianceBankMutation();

  const [updateComplianceDirectorMutation] =
    subsidiaryApi.useUpdateSubsidiaryComplianceDirectorMutation();

  const [updateComplianceOwnerMutation] =
    subsidiaryApi.useUpdateSubsidiaryComplianceOwnerMutation();

  const [updateComplianceKybDetailsMutation] =
    subsidiaryApi.useUpdateSubsidiaryComplianceKybDetailsMutation();

  const [updateSubsidiaryComplianceAgreementMutation] =
    subsidiaryApi.useUpdateSubsidiaryComplianceAgreementMutation();

  const complianceInfoQueryResult =
    subsidiaryApi.useGetSubsidiaryComplianceCheckerQuery();

  const complianceInfo = complianceInfoQueryResult?.data;

  const completenessMap = {
    [ComplianceUpdateStep.BUSINESS_TYPE]:
      !!complianceInfo?.profileCompliance?.businessType?.id,
    [ComplianceUpdateStep.PROFILE]: !(
      complianceInfo?.profileCompliance?.compliancePercentage < 100
    ),
    [ComplianceUpdateStep.CONTACT]: !(
      complianceInfo?.contactCompliance?.compliancePercentage < 100
    ),
    [ComplianceUpdateStep.BUSINESS_REGISTRATION]: !(
      complianceInfo?.businessRegistrationCompliance?.compliancePercentage < 100
    ),
    [ComplianceUpdateStep.OWNER_INFO]: !(
      complianceInfo?.directorOrOwnerCompliance?.compliancePercentage < 100
    ),
    [ComplianceUpdateStep.DIRECTOR_INFO]: !(
      complianceInfo?.directorOrOwnerCompliance?.compliancePercentage < 100
    ),
    [ComplianceUpdateStep.BANK_INFO]: !(
      complianceInfo?.bankCompliance?.compliancePercentage < 100
    ),
    [ComplianceUpdateStep.AGREEMENT]: !(
      complianceInfo?.agreementCompliance?.compliancePercentage < 100
    ),
  };

  const initialStep = isView
    ? ComplianceUpdateStep.PROFILE
    : !completenessMap[ComplianceUpdateStep.BUSINESS_TYPE]
      ? ComplianceUpdateStep.BUSINESS_TYPE
      : !completenessMap[ComplianceUpdateStep.PROFILE]
        ? ComplianceUpdateStep.PROFILE
        : !completenessMap[ComplianceUpdateStep.CONTACT]
          ? ComplianceUpdateStep.CONTACT
          : !completenessMap[ComplianceUpdateStep.BUSINESS_REGISTRATION]
            ? ComplianceUpdateStep.BUSINESS_REGISTRATION
            : !completenessMap[ComplianceUpdateStep.OWNER_INFO] ||
                !completenessMap[ComplianceUpdateStep.DIRECTOR_INFO]
              ? complianceInfo?.profileCompliance?.businessType?.id ==
                ComplianceBusinessType.START_UP
                ? ComplianceUpdateStep.OWNER_INFO
                : ComplianceUpdateStep.DIRECTOR_INFO
              : !completenessMap[ComplianceUpdateStep.BANK_INFO]
                ? ComplianceUpdateStep.BANK_INFO
                : !completenessMap[ComplianceUpdateStep.AGREEMENT]
                  ? ComplianceUpdateStep.AGREEMENT
                  : undefined;

  const stepper = useStepper({
    initialStep,
  });

  const initialValues = useMemo(() => {
    return {
      businessType: complianceInfo?.profileCompliance?.businessType?.id ?? "",
      description: complianceInfo?.profileCompliance?.businessDescription ?? "",
      businessName: complianceInfo?.profileCompliance?.businessName ?? "",
      registrationNumber:
        complianceInfo?.profileCompliance?.registrationNumber ?? "",
      taxIdNumber: complianceInfo?.profileCompliance?.taxIdNumber ?? "",

      verifiedPhoneNumber: complianceInfo?.contactCompliance?.phoneNumber ?? "",
      businessAddress: complianceInfo?.contactCompliance?.businessAddress ?? "",
      email: complianceInfo?.contactCompliance?.emailAddress ?? "",

      CertificateOfIncorporation:
        complianceInfo?.businessRegistrationCompliance?.certOfIncorporation ??
        "",
      MemoOfAssociation:
        complianceInfo?.businessRegistrationCompliance?.memoOfAssociation ?? "",

      FullName: complianceInfo?.directorOrOwnerCompliance?.fullName ?? "",
      DocumentType:
        complianceInfo?.directorOrOwnerCompliance?.uploadedDocument?.id ?? "",
      Identity:
        complianceInfo?.directorOrOwnerCompliance?.uploadedDocument?.name ?? "",
      Bvn: complianceInfo?.directorOrOwnerCompliance?.bvn ?? "",

      bankId: complianceInfo?.bankCompliance?.bankId ?? "",
      bankName: complianceInfo?.bankCompliance?.bankName ?? "",
      accountName: complianceInfo?.bankCompliance?.accountName ?? "",
      accountNumber: complianceInfo?.bankCompliance?.accountNumber ?? "",

      termOfServiceSigned:
        complianceInfo?.agreementCompliance?.termOfServiceSigned ?? false,
      slaSigned: complianceInfo?.agreementCompliance?.slaSigned ?? false,
      msaSigned: complianceInfo?.agreementCompliance?.msaSigned ?? false,
      signedBy: complianceInfo?.agreementCompliance?.signedBy ?? "",
    } as ComplianceUpdateFormikValues;
  }, [complianceInfo]);

  const formik = useFormik<ComplianceUpdateFormikValues>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: yup.object({
      ...{
        [ComplianceUpdateStep.PROFILE]: {
          businessType: yup.number().label("Business type").required(),
          businessName: yup.string().label("Business Name").required(),
          description: yup
            .string()
            .label("Description")
            .max(50)
            .when("businessType", ([businessType], schema) =>
              businessType === ComplianceBusinessType.START_UP
                ? schema.required()
                : schema.optional()
            ),
          registrationNumber: yup
            .string()
            .label("Registration Number")
            .when("businessType", ([businessType], schema) =>
              businessType === ComplianceBusinessType.REGISTERED
                ? schema.required()
                : schema.optional()
            ),
          taxIdNumber: yup
            .string()
            .label("Tax ID")
            .when("businessType", ([businessType], schema) =>
              businessType === ComplianceBusinessType.REGISTERED
                ? schema.required()
                : schema.optional()
            ),
        },
        [ComplianceUpdateStep.CONTACT]: {
          verifiedPhoneNumber: yup
            .string()
            .label("Phone number")
            .test(getPhoneNumberTest())
            .required(),
          businessAddress: yup.string().label("Address").required(),
          email: yup.string().label("Email").required(),
        },
        [ComplianceUpdateStep.BUSINESS_REGISTRATION]: {
          CertificateOfIncorporation: yup.mixed().label("CAC").required(),
          MemoOfAssociation: yup.mixed().label("MOA").required(),
        },
        [ComplianceUpdateStep.OWNER_INFO]: {
          FullName: yup.string().required("Full Name is required"),
          Identity: yup.mixed().required(""),
          DocumentType: yup.string().label("Document Type").required(),
          Bvn: yup
            .string()
            .label("BVN")
            .length(11, "BVN must be 11 digits")
            .matches(/^[0-9]+$/, "BVN must be a number")
            .required(),
        },
        [ComplianceUpdateStep.DIRECTOR_INFO]: {
          FullName: yup.string().required("Full Name is required"),
          Identity: yup.mixed().required(""),
          DocumentType: yup.string().label("Document Type").required(),
          Bvn: yup
            .string()
            .label("BVN")
            .matches(/^[0-9]+$/, "BVN must be a number")
            .required(),
        },
        [ComplianceUpdateStep.BANK_INFO]: {
          bankId: yup.string().label("Bank").required(),
          bankName: yup.string().label("Bank Name").required(),
          accountName: yup.string().label("Account Name").required(),
          accountNumber: yup
            .string()
            .label("Account Number")
            .matches(/^[0-9]+$/, "Account Number must be a number")
            .required(),
        },
        [ComplianceUpdateStep.AGREEMENT]: {
          signedBy: yup.string().required("Full Name is required"),
        },
      }[stepper.step],
    }),
    onSubmit: async (values) => {
      try {
        switch (stepper.step) {
          case ComplianceUpdateStep.BUSINESS_TYPE: {
            stepper.next();
            break;
          }
          case ComplianceUpdateStep.PROFILE: {
            const data = await updateComplianceProfileMutation({
              body: {
                businessType: values.businessType,
                description: values.description,
                businessName: values.businessName,
                registrationNumber: values.registrationNumber,
                taxIdNumber: values.taxIdNumber,
              },
            }).unwrap();

            enqueueSnackbar(data?.message || "Profile Information Submitted", {
              variant: "success",
            });

            stepper.next();
            break;
          }
          case ComplianceUpdateStep.CONTACT: {
            const verifiedPhoneNumber = getPhoneNumberInfo(
              values?.verifiedPhoneNumber
            )?.nationalNumberNormalized;

            const data = await updateComplianceContactMutation({
              body: {
                verifiedPhoneNumber: verifiedPhoneNumber,
                businessAddress: values?.businessAddress,
                email: values?.email,
              },
            }).unwrap();

            enqueueSnackbar(data?.message || "Contact Information Submitted", {
              variant: "success",
            });

            if (isStartupBusiness) {
              stepper.go(ComplianceUpdateStep.OWNER_INFO);
            } else {
              stepper.next();
            }
            break;
          }
          case ComplianceUpdateStep.BUSINESS_REGISTRATION: {
            const data = await updateComplianceKybDetailsMutation({
              body: {
                CertificateOfIncorporation:
                  values.CertificateOfIncorporation instanceof Blob
                    ? values?.CertificateOfIncorporation
                    : null,
                MemoOfAssociation:
                  values.MemoOfAssociation instanceof Blob
                    ? values?.MemoOfAssociation
                    : null,
              },
            }).unwrap();
            enqueueSnackbar(data?.message || "Business Information Submitted", {
              variant: "success",
            });
            stepper.go(ComplianceUpdateStep.DIRECTOR_INFO);
            break;
          }
          case ComplianceUpdateStep.OWNER_INFO: {
            const data = await updateComplianceOwnerMutation({
              body: {
                FullName: values?.FullName,
                Identity:
                  values?.Identity instanceof Blob ? values?.Identity : null,
                DocumentType: values.DocumentType,
                Bvn: values.Bvn,
              },
            }).unwrap();
            enqueueSnackbar(data?.message || "Owner Information Submitted", {
              variant: "success",
            });
            stepper.go(ComplianceUpdateStep.BANK_INFO);
            break;
          }
          case ComplianceUpdateStep.DIRECTOR_INFO: {
            const data = await updateComplianceDirectorMutation({
              body: {
                FullName: values?.FullName,
                Identity: values?.Identity,
                DocumentType: values.DocumentType,
                Bvn: values.Bvn,
              },
            }).unwrap();
            enqueueSnackbar(data?.message || "Director Information Submitted", {
              variant: "success",
            });
            stepper.next();
            break;
          }
          case ComplianceUpdateStep.BANK_INFO: {
            const data = await updateComplianceBankMutation({
              body: {
                bankId: values?.bankId,
                bankName: values?.bankName,
                accountName: values?.accountName,
                accountNumber: values?.accountNumber,
              },
            }).unwrap();
            enqueueSnackbar(data?.message || "Bank information Submitted", {
              variant: "success",
            });
            stepper.next();
            break;
          }
          case ComplianceUpdateStep.AGREEMENT: {
            const data = await updateSubsidiaryComplianceAgreementMutation({
              body: {
                termOfServiceSigned: values.termOfServiceSigned,
                slaSigned: values.slaSigned,
                msaSigned: values.msaSigned,
                signedBy: values.signedBy,
              },
            }).unwrap();
            enqueueSnackbar(data?.message || "Agreement Submitted", {
              variant: "success",
            });
            enqueueSnackbar("Compliance Submitted and pending approval", {
              variant: "success",
            });
            navigate(COMPLIANCE);
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

  // console.log(formik.values);
  // console.log(formik.errors);

  const isStartupBusiness =
    formik.values.businessType === ComplianceBusinessType.START_UP;
  const isRegisteredBusiness = !isStartupBusiness;

  const backButtonJsx = (
    <IconButton edge="start" size="small" onClick={() => stepper.previous()}>
      <Icon>arrow_back</Icon>
    </IconButton>
  );

  const dataRef = useDataRef({
    backButtonJsx,
    isView,
    formik,
    stepper,
    complianceInfo,
    isStartupBusiness,
    isRegisteredBusiness,
  });

  const contentProps = { ...dataRef.current, dataRef };

  const contents = [
    {
      title: "Business Type",
      body: <ComplianceUpdateBusinessType {...contentProps} />,
      hide: true,
    },
    {
      title: "Profile Setup",
      body: <ComplianceUpdateProfile {...contentProps} />,
    },
    {
      title: "Contact Setup",
      body: <ComplianceUpdateContact {...contentProps} />,
    },
    {
      title: "Business Registration",
      body: <ComplianceUpdateBusinessRegistration {...contentProps} />,
      hide: isStartupBusiness,
    },
    {
      title: "Owner Setup",
      body: <ComplianceUpdateOwnerInfo {...contentProps} />,
      hide: isRegisteredBusiness,
    },
    {
      title: "Director's Details",
      body: <ComplianceUpdateOwnerInfo {...contentProps} />,
      hide: isStartupBusiness,
    },
    {
      title: "Account Setup",
      body: <ComplianceUpdateBankInfo {...contentProps} />,
    },
    {
      title: "Agreement",
      body: <ComplianceUpdateAgreement {...contentProps} />,
    },
  ];

  const content = contents[stepper.step];

  const isShowStepper = ![ComplianceUpdateStep.BUSINESS_TYPE].includes(
    stepper.step
  );

  function wrapBodyWithLoading(body: any) {
    return (
      <LoadingContent
        loading={complianceInfoQueryResult.isLoading}
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
        {body}
      </LoadingContent>
    );
  }

  if (!isView && (initialStep === undefined || initialStep === null)) {
    return <Navigate to={COMPLIANCE} replace />;
  }

  return (
    <div className={clsx("flex gap-4")}>
      <div className="">
        {isShowStepper ? (
          <Stepper orientation="vertical">
            {contents
              // .filter((content) => !content.hide)
              .map((content, index) => {
                // const isDoneStep = stepper.step > index;

                if (content.hide) return null;

                return (
                  <Step
                    key={index}
                    active={index === stepper.step}
                    completed={completenessMap[index]}
                  >
                    <StepLabel
                      className={clsx("space-x-2", isView && "cursor-pointer")}
                      onClick={() => {
                        if (isView) {
                          stepper.go(index);
                        }
                      }}
                    >
                      {content.title}
                    </StepLabel>
                    {!ismd && (
                      <StepContent>
                        {wrapBodyWithLoading(content.body)}
                      </StepContent>
                    )}
                  </Step>
                );
              })}
          </Stepper>
        ) : null}
      </div>

      <div className="flex-1">
        {ismd || !isShowStepper ? (
          <div className="w-full max-w-xl mx-auto">
            {wrapBodyWithLoading(content.body)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const Component = ComplianceUpdate;

export default ComplianceUpdate;

// function getEnumStepIndex(enumStep: ComplianceUpdateStep) {
//   const index = STEPS_INDEX.indexOf(enumStep);
//   return index > -1 ? index : undefined;
// }
//
// const STEPS_INDEX = [
//   ComplianceUpdateStep.BUSINESS_TYPE,
//   ComplianceUpdateStep.PROFILE,
//   ComplianceUpdateStep.CONTACT,
//   ComplianceUpdateStep.OWNER_INFO,
//   ComplianceUpdateStep.BUSINESS_REGISTRATION,
//   ComplianceUpdateStep.BANK_INFO,
// ];
//
type ComplianceUpdateProps = {
  isView?: boolean;
};
