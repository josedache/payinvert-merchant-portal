import { ReactNode, useMemo } from "react";
import { useSnackbar } from "notistack";
import useToggle from "hooks/use-toggle";
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
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import CurrencyTextField from "components/CurrencyTextField";
import { paymentLinkApi } from "apis/payment-link";
import { serviceApi } from "apis/service";
import * as yup from "yup";
import NumberTextField from "components/NumberTextField";

function PaymentLinkCreateEdit(props: PaymentLinkCreateEditProps) {
  const { id, children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const isEdit = !!id;

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const [createPaymentLinkMutation] =
    paymentLinkApi.useCreatePaymentLinkMutation();

  const [updatePaymentLinkNewMutation] =
    paymentLinkApi.useUpdatePaymentLinkNewMutation();

  const paymentLinkTypesQueryResult =
    paymentLinkApi.useGetPaymentLinkTypesQuery(undefined);

  const paymentLinkTypes = paymentLinkTypesQueryResult.data?.paymentLinkTypes;

  const currenciesQueryResult = serviceApi.useGetCurrenciesQuery(undefined);

  const currencies = currenciesQueryResult.data?.data;

  const paymentLinkQueryResult = paymentLinkApi.useGetPaymentLinksQuery(
    useMemo(() => ({ params: { Id: id! } }), [id]),
    { skip: !id }
  );

  const paymentLink = paymentLinkQueryResult.data?.items?.[0];

  const initialValues = useMemo(
    () => ({
      name: paymentLink?.name ?? "",
      description: paymentLink?.description ?? "",
      paymentType: paymentLink?.paymentType
        ? (paymentLinkTypes?.find(
            (paymentLinkType) =>
              paymentLinkType.paymentLinkName == paymentLink?.paymentType
          )?.code ?? "")
        : "",
      amount: paymentLink?.amount ?? 0,
      // mobile: paymentLink?.mobile ?? "",
      // backgroundImage: paymentLink?.backgroundImage ?? "",
      // website: paymentLink?.website ?? "",
      currency: paymentLink?.currency
        ? (currencies?.find(
            (currency) => currency.shortName == paymentLink?.currency
          )?.id ?? "")
        : "",
      limit: paymentLink?.limit ?? 0,
      paymentLinkId: id,
    }),
    [paymentLink, currencies, paymentLinkTypes]
  );

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
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
    onSubmit: async (values) => {
      try {
        const func = isEdit
          ? updatePaymentLinkNewMutation
          : createPaymentLinkMutation;

        const data = await func({
          body: { ...values, paymentLinkId: id },
        }).unwrap();

        enqueueSnackbar(
          data?.message ||
            `Payment link ${isEdit ? "updated" : "created"} successfully`,
          {
            variant: "success",
          }
        );

        handleClose();
      } catch (error: any) {
        enqueueSnackbar(
          error?.data?.message ||
            `Failed to ${isEdit ? "update" : "create"} payment link. Please try again.`,
          { variant: "error" }
        );
      }
    },
  });

  // console.log(formik.errors);

  function handleClose(e?: any, reason?: any) {
    formik.resetForm();
    onClose?.(e, reason);
    setOpen(false);
  }

  const isSingleUsage = paymentLinkTypes
    ?.find((type) => type.code === formik.values.paymentType)
    ?.paymentLinkName?.match(/^Single/i);

  return (
    <>
      <Dialog open={isOpen} fullWidth {...restProps}>
        <DialogTitleXCloseButton
          onClose={handleClose}
          className="bg-primary-main text-primary-contrastText"
        >
          {isEdit ? "Edit payment link" : "Create new payment link"}
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
                {paymentType.paymentLinkName?.match(/^Single/i)
                  ? "Single Usage"
                  : paymentType.paymentLinkName?.match(/^Multiple/i)
                    ? "Multiple Usage"
                    : paymentType.paymentLinkName}
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
          {!isSingleUsage && formik.values.paymentType ? (
            <NumberTextField
              fullWidth
              margin="normal"
              label="Limit (Optional)"
              placeholder="Enter a limit"
              {...getTextFieldProps(formik, "limit")}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            // disabled={!formik.isValid || !formik.dirty}
            disabled={!formik.isValid}
            loading={formik.isSubmitting}
            loadingPosition="end"
            endIcon={<></>}
            onClick={formik.handleSubmit as any}
          >
            {isEdit ? "Update" : "Create"} link
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
  id?: number;
  open?: boolean;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DialogProps, "children" | "open" | "id">;
