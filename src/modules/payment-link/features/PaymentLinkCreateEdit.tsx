import { ReactNode } from "react";
import { useSnackbar } from "notistack";
import useToggle from "hooks/use-toggle.ts";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  MenuItem,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton.tsx";
import { getTextFieldProps } from "utils/formik/get-text-field-props.ts";
import CurrencyTextField from "components/CurrencyTextField.tsx";
import { paymentLinkApi } from "apis/payment-link.ts";
import { serviceApi } from "apis/service.ts";
import * as yup from "yup";
import NumberTextField from "components/NumberTextField.tsx";

function PaymentLinkCreateEdit(props: PaymentLinkCreateEditProps) {
  const { children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const [createPaymentLinkMutation] =
    paymentLinkApi.useCreatePaymentLinkMutation();

  const paymentLinkTypesQueryResult =
    paymentLinkApi.useGetPaymentLinkTypesQuery(undefined);

  const paymentLinkTypes = paymentLinkTypesQueryResult.data?.paymentLinkTypes;

  const currenciesQueryResult = serviceApi.useGetCurrenciesQuery(undefined);

  const currencies = currenciesQueryResult.data?.data;

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      paymentType: "",
      amount: 0,
      mobile: "",
      backgroundImage: "",
      website: "",
      currency: "",
      limit: 0,
    },
    validationSchema: yup.object({
      name: yup.string().label("Link Name").required(),
      description: yup.string().label("Description").required(),
      paymentType: yup.string().label("Payment Type").optional(),
      amount: yup.number().label("Amount").optional(),
      mobile: yup.string().label("Mobile").optional(),
      backgroundImage: yup.string().label("Background Image").optional(),
      website: yup.string().label("Website URL").optional(),
      currency: yup.string().label("Currency").required(),
      limit: yup.number().label("Limit").optional(),
    }),
    onSubmit: async () => {
      try {
        await createPaymentLinkMutation({
          body: formik.values,
        }).unwrap();

        enqueueSnackbar("Payment link created successfully", {
          variant: "success",
        });

        handleClose();
      } catch (error: any) {
        enqueueSnackbar(
          error?.data?.message ||
            "Failed to create payment link. Please try again.",
          { variant: "error" }
        );
      }
    },
  });

  function handleClose(e?: any, reason?: any) {
    formik.resetForm();
    onClose?.(e, reason);
    setOpen(false);
  }

  return (
    <>
      <Dialog open={isOpen} fullWidth {...restProps}>
        <DialogTitleXCloseButton
          onClose={handleClose}
          className="bg-primary-main text-primary-contrastText"
        >
          New payment Link
        </DialogTitleXCloseButton>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Link name"
            placeholder="Enter a name for your link"
            {...getTextFieldProps(formik, "name")}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            placeholder="Enter a description for your link"
            {...getTextFieldProps(formik, "description")}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Currency"
            placeholder="Select currency"
            {...getTextFieldProps(formik, "currency")}
            required
            select
          >
            {currencies?.map((currency) => (
              <MenuItem key={currency.id} value={currency.id}>
                {currency.name} ({currency.shortName})
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Payment type"
            placeholder="Select payment type"
            {...getTextFieldProps(formik, "paymentType")}
            required
            select
          >
            {paymentLinkTypes?.map((paymentType) => (
              <MenuItem key={paymentType.id} value={paymentType.code}>
                {paymentType.paymentLinkName}
              </MenuItem>
            ))}
          </TextField>
          <CurrencyTextField
            fullWidth
            margin="normal"
            label="Amount (Optional)"
            placeholder="Enter an amount"
            {...getTextFieldProps(formik, "amount")}
          />
          <NumberTextField
            fullWidth
            margin="normal"
            label="Limit (Optional)"
            placeholder="Enter a limit"
            {...getTextFieldProps(formik, "limit")}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            loading={formik.isSubmitting}
            loadingPosition="end"
            endIcon={<></>}
            onClick={formik.handleSubmit as any}
          >
            Create new link
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {typeof children === "function"
        ? children({ isOpen, toggleOpen, setOpen })
        : children}
    </>
  );
}

export default PaymentLinkCreateEdit;

export type PaymentLinkCreateEditProps = {
  open?: boolean;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DialogProps, "children" | "open">;
