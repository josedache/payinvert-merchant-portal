import { ReactNode } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Icon,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton.tsx";
import useToggle from "hooks/use-toggle.ts";
import * as dfns from "date-fns";
import { useFormik } from "formik";
import * as yup from "yup";
import { getTextFieldProps } from "utils/formik/get-text-field-props.ts";
import DatePicker from "components/DatePicker.tsx";
import { getTextFieldHelperTextAndError } from "utils/formik/get-text-field-helper-text-and-error.ts";
import { Icon as Iconify } from "@iconify/react";

function TransactionFilter(props: TransactionFilterProps) {
  const { filter, onFilterApply, children, onClose, ...restProps } = props;

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const formik = useFormik<TransactionFilterState>({
    initialValues: {
      Status: filter?.Status ?? "",
      FromDate: filter?.FromDate ?? "",
      ToDate: filter?.ToDate ?? "",
      Channel: filter?.Channel ?? "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      Status: yup.string().label("Status").optional(),
      FromDate: yup.date().label("From Date").nullable().optional(),
      ToDate: yup.date().label("End Date").nullable().optional(),
      Channel: yup.number().label("Channel").optional(),
    }),
    onSubmit: (values) => {
      onFilterApply({ ...values });
      handleClose();
    },
  });

  function handleReset() {
    formik.resetForm({
      values: {
        Status: "",
        FromDate: "",
        ToDate: "",
        Channel: "",
      },
    });
  }

  function handleClose(e?: any, reason?: any) {
    onClose?.(e, reason);
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        {...restProps}
      >
        <DialogTitleXCloseButton onClose={handleClose} className="hidden">
          Filter
        </DialogTitleXCloseButton>
        <DialogContent className="space-y-4 p-2">
          <Accordion elevation={0} className="">
            <AccordionSummary
              className=""
              expandIcon={
                <Icon>
                  <Iconify icon="iconamoon:arrow-down-2" />
                </Icon>
              }
            >
              <Typography variant="h6" className="font-bold">
                Channel
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="space-y-4">
              <TextField
                className="col-span-2"
                fullWidth
                select
                // label="Channel"
                placeholder="Select a channel"
                {...getTextFieldProps(formik, "Channel")}
                slotProps={{ select: { displayEmpty: true } }}
              >
                <MenuItem key={-1} value={""} disabled>
                  Select a channel
                </MenuItem>
                {[{ label: " USSD", value: "ussd" }].map(({ label, value }) => (
                  <MenuItem key={label} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </AccordionDetails>
          </Accordion>
          <Accordion elevation={0} className="">
            <AccordionSummary
              className=""
              expandIcon={
                <Icon>
                  <Iconify icon="iconamoon:arrow-down-2" />
                </Icon>
              }
            >
              <Typography variant="h6" className="font-bold">
                Status
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="space-y-4">
              <TextField
                className="col-span-2"
                fullWidth
                select
                // label="Channel"
                placeholder="Select a channel"
                {...getTextFieldProps(formik, "Status")}
                slotProps={{ select: { displayEmpty: true } }}
              >
                <MenuItem key={-1} value={""} disabled>
                  Select a status
                </MenuItem>
                {[
                  { label: "Initiated", value: "Initiated" },
                  { label: "Pending", value: "Pending" },
                  {
                    label: "Awaiting-Confirmation",
                    value: "Awaiting-Confirmation",
                  },
                  { label: "Failed", value: "Failed" },
                  { label: "Successful", value: "Successful" },
                  { label: "Reversed", value: "Reversed" },
                  { label: "Processing", value: "Processing" },
                ].map(({ label, value }) => (
                  <MenuItem key={label} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </AccordionDetails>
          </Accordion>
          <Accordion elevation={0} className="">
            <AccordionSummary
              className=""
              expandIcon={
                <Icon>
                  <Iconify icon="iconamoon:arrow-down-2" />
                </Icon>
              }
            >
              <Typography variant="h6" className="font-bold">
                Date range
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="space-y-4">
              <DatePicker
                className="flex-1"
                disableFuture
                value={formik.values.FromDate}
                onChange={(value) => {
                  if (!dfns.isValid(value)) {
                    return;
                  }
                  formik.setFieldValue("FromDate", value);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: "From Date",
                    ...getTextFieldHelperTextAndError(formik, "FromDate"),
                  },
                }}
              />
              <DatePicker
                className="flex-1"
                disableFuture
                value={formik.values.FromDate}
                onChange={(value) => {
                  if (!dfns.isValid(value)) {
                    return;
                  }
                  formik.setFieldValue("ToDate", value);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: "To Date",
                    ...getTextFieldHelperTextAndError(formik, "ToDate"),
                  },
                }}
              />
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions className="p-6">
          <Button onClick={handleReset as any}>Reset</Button>
          <Button onClick={formik.handleSubmit as any}>Apply Filter</Button>
        </DialogActions>
      </Dialog>
      {typeof children === "function"
        ? children({ isOpen, toggleOpen, setOpen })
        : children}
    </>
  );
}

export default TransactionFilter;

export type TransactionFilterProps = {
  filter: TransactionFilterState;
  onFilterApply: (filter: TransactionFilterState) => void;
  open?: boolean;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DialogProps, "children" | "open" | "id">;

export type TransactionFilterState = {
  Status?: string;
  FromDate?: Date | string;
  ToDate?: Date | string;
  Channel?: string;
};
