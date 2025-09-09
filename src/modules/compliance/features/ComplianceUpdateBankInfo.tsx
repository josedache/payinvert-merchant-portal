import {
  Autocomplete,
  CircularProgress,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import NumberTextField from "components/NumberTextField";
import { Icon as Iconify } from "@iconify/react";
import { ComplianceUpdateContentProps } from "../types/compliance-update";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import { subsidiaryApi } from "apis/subsidiary";
import { LoadingButton } from "@mui/lab";
import { verificationApi } from "apis/verification";
import { useEffect, useMemo } from "react";
import { getTextFieldError } from "utils/formik/get-text-field-error";
import { getTextFieldHelperText } from "utils/formik/get-text-field-helper-text";

function ComplianceUpdateBankInfo(props: ComplianceUpdateBankDetailsProps) {
  const { backButtonJsx, formik, dataRef, isView } = props;
  const getBanksQuery = subsidiaryApi.useGetSubsidiaryBanksQuery();
  const banks = getBanksQuery?.data?.banks || [];

  const normalizedBanks = banks?.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  const bankCode = normalizedBanks?.[formik.values.bankId]?.bankCode;

  const nameEnquiryVerificationQueryResult =
    verificationApi.useGetNameEnquiryVerificationQuery(
      useMemo(
        () => ({
          body: {
            bankCode: bankCode,
            nipBankCode: bankCode,
            accountNumber: formik.values.accountNumber,
          },
        }),
        [formik.values.accountNumber, bankCode]
      ),
      {
        skip:
          !(
            bankCode &&
            formik.values.accountNumber &&
            formik.values.accountNumber?.length === 10
          ) || isView,
      }
    );

  const nameEnquiryVerification = nameEnquiryVerificationQueryResult.data?.data;

  useEffect(() => {
    if (nameEnquiryVerification) {
      dataRef.current.formik.setFieldValue(
        "accountName",
        nameEnquiryVerification?.accountName || ""
      );
    }
  }, [nameEnquiryVerification?.accountName]);

  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      className="w-full max-w-xl p-6 space-y-4"
    >
      <div className='flex items-center gap-1'>
        {backButtonJsx}
        <Typography variant="h6" className="font-semibold">
          Account Setup
        </Typography>
      </div>

      <NumberTextField
        freeSolo
        maskOptions={{ min: 0, max: 10 }}
        label="Account number"
        fullWidth
        disabled={isView}
        {...getTextFieldProps(formik, "accountNumber")}
      />

      {/*<TextField*/}
      {/*  label="Bank name"*/}
      {/*  select*/}
      {/*  fullWidth*/}
      {/*  disabled={isView}*/}
      {/*  {...getTextFieldProps(formik, "bankId")}*/}
      {/*  onChange={(e) => {*/}
      {/*    formik.setFieldValue(*/}
      {/*      "bankName",*/}
      {/*      normalizedBanks?.[e.target.value]?.name || ""*/}
      {/*    );*/}
      {/*    formik.setFieldValue("bankId", e.target.value);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {banks?.map?.((bank) => (*/}
      {/*    <MenuItem key={bank.id} value={bank.id}>*/}
      {/*      {bank.name}*/}
      {/*    </MenuItem>*/}
      {/*  ))}*/}
      {/*</TextField>*/}

      <Autocomplete
        disablePortal
        options={banks || []}
        disabled={isView}
        fullWidth
        getOptionLabel={(option) => {
          return option?.name;
        }}
        isOptionEqualToValue={(option, value) => {
          return option?.id == value?.id || option === value;
        }}
        value={
          formik.values.bankId && normalizedBanks?.[formik.values.bankId]
            ? normalizedBanks?.[formik.values.bankId]
            : null
        }
        onChange={(_, value) => {
          formik.setFieldValue("bankName", value?.name || "");
          formik.setFieldValue("bankId", value?.id || "");
        }}
        renderInput={(params) => <TextField {...params} label="Bank name" />}
      />

      <TextField
        /*{...getTextFieldProps(formik, "accountName")}*/
        label="Account Name"
        fullWidth
        disabled
        value={formik.values.accountName}
        error={
          nameEnquiryVerificationQueryResult.isError ||
          getTextFieldError(formik, "accountName")
        }
        helperText={
          nameEnquiryVerificationQueryResult.isError
            ? (nameEnquiryVerificationQueryResult.error as any)?.data
                ?.message ||
              "Failed to resolved account name. Please try again."
            : getTextFieldHelperText(formik, "accountName")
        }
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {nameEnquiryVerificationQueryResult.isFetching ||
                nameEnquiryVerificationQueryResult.isLoading ? (
                  <CircularProgress size={10} />
                ) : null}
              </InputAdornment>
            ),
          },
        }}
      />

      {!isView ? (
        <LoadingButton
          startIcon={
            <Iconify icon="humbleicons:check" width="20" height="20" />
          }
          fullWidth
          type="submit"
          loading={formik.isSubmitting}
        >
          Save
        </LoadingButton>
      ) : null}
    </Paper>
  );
}

export type ComplianceUpdateBankDetailsProps =
  {} & ComplianceUpdateContentProps;

export default ComplianceUpdateBankInfo;
