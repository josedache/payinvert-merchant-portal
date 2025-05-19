import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import useStepper from "hooks/use-stepper";
import { useMemo } from "react";
import * as yup from "yup";
import StepOne from "../features/StepOne";
import StepTwo from "../features/StepTwo";
import { useNavigate, useParams } from "react-router-dom";
import { BUSINESS_INVOICES } from "constants/urls";

const AddInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const stepper = useStepper({
    initialStep: getEnumStepIndex(FormStep.BUSINESS_DETAILS),
  });

  const enumStep = STEPS_INDEX[stepper.step];

  const initialValues = useMemo(
    () =>
      ({
        business: {},
        invoice: {
          items: [{ description: "", quantity: 1, price: 0 }],
        },
      }) as any,
    []
  );

  const formik = useFormik<any>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: yup.object({
      ...{
        [FormStep.BUSINESS_DETAILS]: {
          business: yup.object({}),
        },
        [FormStep.INVOICE_DETAILS]: {
          invoice: yup.object({}),
        },
      }[enumStep],
    }),
    onSubmit: async () => {
      try {
        switch (enumStep) {
          case FormStep.BUSINESS_DETAILS: {
            break;
          }
          case FormStep.INVOICE_DETAILS: {
            navigate(BUSINESS_INVOICES);
            break;
          }

          default:
            break;
        }
        stepper.next();
      } catch (error) {
        // toast.error(error?.message || "Failed to process");
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
  });

  const contentProps = { formik, stepper, getEnumStepIndex };

  const contents = [
    <StepOne {...contentProps} />,
    <StepTwo {...contentProps} />,
  ];

  const content = contents[stepper.step];

  const currentStep = stepper.step;

  const isFirstStep = enumStep === FormStep.BUSINESS_DETAILS;
  const isLastStep = enumStep === FormStep.INVOICE_DETAILS;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center gap-5">
        <Typography variant="h6" className="font-semibold">
          {id ? "Edit" : "New"} Invoice
        </Typography>
        <Typography variant="h6" className="text-gray-500">
          Step {currentStep + 1}{" "}
          <span className="text-gray-500">of {contents.length}</span>
        </Typography>
      </div>

      {content}

      <div className="w-full flex items-center justify-between gap-4">
        <Button
          onClick={() => stepper.previous()}
          disabled={formik.isSubmitting || isFirstStep}
          type="button"
          className="w-full"
          variant="outlined"
        >
          Back
        </Button>

        <Button
          onClick={formik.handleSubmit as any}
          loading={formik.isSubmitting}
          type="submit"
          className="w-full"
        >
          {isLastStep ? "Save" : "Next"}
        </Button>
      </div>
    </div>
  );
};
export const Component = AddInvoice;
export default AddInvoice;

enum FormStep {
  BUSINESS_DETAILS,
  INVOICE_DETAILS,
}
function getEnumStepIndex(enumStep: FormStep) {
  const index = STEPS_INDEX.indexOf(enumStep);
  return index > -1 ? index : undefined;
}

const STEPS_INDEX = [FormStep.BUSINESS_DETAILS, FormStep.INVOICE_DETAILS];

export type FormContentProps = {
  formik: ReturnType<typeof useFormik<any>>;
  stepper: ReturnType<typeof useStepper>;
  getEnumStepIndex: (enumStep: FormStep) => number;
};
