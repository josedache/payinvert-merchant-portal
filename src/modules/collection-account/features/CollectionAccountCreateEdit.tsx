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
import { collectionAccountApi } from "apis/collection-account.ts";
import * as yup from "yup";
import NumberTextField from "components/NumberTextField.tsx";
import { subsidiaryApi } from "apis/subsidiary-enum.ts";

function CollectionAccountCreateEdit(props: CollectionAccountCreateEditProps) {
  const { children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const [createCollectionAccountMutation] =
    collectionAccountApi.useCreateCollectionAccountBusinessMutation();

  const collectionBankEnumsQueryResult =
    subsidiaryApi.useGetSubsidiaryCollectionBankEnumsQuery(undefined);

  const collectionBankEnums = collectionBankEnumsQueryResult.data;

  const formik = useFormik({
    initialValues: {
      collectionAccountType: "",
      accountFirstName: "",
      accountLastName: "",
      mobileNumber: "",
      bvn: "",
      externalId: "",
    },
    validationSchema: yup.object({
      collectionAccountType: yup.string().label("Account Type").required(),
      accountFirstName: yup.string().label("First Name").required(),
      accountLastName: yup.string().label("Last Name").required(),
      mobileNumber: yup.string().label("Mobile Number").required(),
      bvn: yup.string().label("BVN").required(),
      externalId: yup.string().label("Website URL").optional(),
    }),
    onSubmit: async () => {
      try {
        await createCollectionAccountMutation({
          body: formik.values,
        }).unwrap();

        enqueueSnackbar("Collection account created successfully", {
          variant: "success",
        });

        handleClose();
      } catch (error: any) {
        enqueueSnackbar(
          error?.data?.message ||
            "Failed to create collection account. Please try again.",
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
          Create collection account
        </DialogTitleXCloseButton>
        <DialogContent>
          <div className="grid gap-4 py-6">
            <TextField
              fullWidth
              label="First name"
              placeholder="Enter your first name"
              {...getTextFieldProps(formik, "accountFirstName")}
              required
            />
            <TextField
              fullWidth
              label="Last name"
              placeholder="Enter your last name"
              {...getTextFieldProps(formik, "accountLastName")}
              required
            />
            <NumberTextField
              freeSolo
              className="md:col-span-2"
              fullWidth
              label="BVN"
              placeholder="Enter a bvn"
              {...getTextFieldProps(formik, "bvn")}
              required
            />
            <NumberTextField
              freeSolo
              className="md:col-span-2"
              fullWidth
              label="Phone number"
              placeholder="Enter acocunt phone number"
              {...getTextFieldProps(formik, "mobileNumber")}
              required
            />
            <TextField
              className="md:col-span-2"
              fullWidth
              label="Bank type"
              placeholder="Select bank type"
              {...getTextFieldProps(formik, "collectionAccountType")}
              required
              select
            >
              {collectionBankEnums?.map(({ name }) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            {/*<TextField*/}
            {/*  className="md:col-span-2"*/}
            {/*  fullWidth*/}
            {/*  label="External ID"*/}
            {/*  placeholder="Enter your external ID"*/}
            {/*  {...getTextFieldProps(formik, "externalId")}*/}
            {/*  required*/}
            {/*/>*/}
          </div>
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
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {typeof children === "function"
        ? children({ isOpen, toggleOpen, setOpen })
        : children}
    </>
  );
}

export default CollectionAccountCreateEdit;

export type CollectionAccountCreateEditProps = {
  open?: boolean;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
} & Omit<DialogProps, "children" | "open">;
