import {
  Button,
  FormControlLabel,
  Icon,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import { PayoutAccountType } from "modules/payout/enums/payout-account-type";
import useTable from "hooks/use-table";
import { ColumnDef } from "@tanstack/react-table";
import PayoutAccountSettingTableAction from "modules/payout/features/PayoutAccountSettingTableAction";
import TanStandardTable from "components/TanStandardTable";
import { Icon as Iconify } from "@iconify/react";
import { cn } from "utils/cn";
import PageTitle from "components/PageTitle";
import { subsidiaryApi } from "apis/subsidiary";
import { useMemo } from "react";
import useAuthUser from "hooks/use-auth-user";

function PayoutAccountSetting() {
  const authUser = useAuthUser();

  const complianceInfo = authUser?.compliance;

  const banksQueryResult = subsidiaryApi.useGetSubsidiaryBanksQuery();
  const banks = banksQueryResult?.data?.banks || [];

  const formik = useFormik({
    initialValues: {
      accountType: PayoutAccountType.PAYINVERT,
      bankId: complianceInfo?.bankCompliance?.bankId,
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const bankAccounts = useMemo(() => {
    const bank = banks.find((bank) => String(bank.id) === formik.values.bankId);

    return [
      {
        bankName: complianceInfo?.bankCompliance?.bankName || bank?.name,
        accountNumber: complianceInfo?.bankCompliance?.accountNumber,
        accountName: complianceInfo?.profileCompliance?.businessName,
        currency: "NGN",
      },
    ];
  }, [banks, formik.values.bankId]);

  const tableInstance = useTable({
    data: bankAccounts,
    columns,
  });

  const isPayInvertAccountType =
    formik.values.accountType === PayoutAccountType.PAYINVERT;

  return (
    <>
      <PageTitle breadcrumbs={[{ label: "Payout accounts" }]}>
        Payout accounts
      </PageTitle>
      <div className="space-y-4">
        <Paper
          variant="outlined"
          className="p-4 md:p-6 space-y-4 w-full max-w-lg"
        >
          <div>
            <Typography variant="h6">Account</Typography>
            <Typography variant="body1">
              Choose the account to receive your withdrawal.
            </Typography>
          </div>
          <RadioGroup {...getTextFieldProps(formik, "accountType")}>
            {/*<FormControlLabel*/}
            {/*  value={PayoutAccountType.BANK}*/}
            {/*  control={<Radio />}*/}
            {/*  label="Settle to bank"*/}
            {/*/>*/}
            {/*<Divider />*/}
            <FormControlLabel
              value={PayoutAccountType.PAYINVERT}
              control={<Radio />}
              label={
                <Tooltip title="Your inflows and settlements will be automatically credited to your PayInvert wallet. Click on your dashboard to view your balance">
                  <span className="flex items-center gap-2">
                    <span>Settle to Payinvert account</span>
                    {/*<Icon fontSize="small">*/}
                    {/*  <Iconify icon="ph:question-duotone" />*/}
                    {/*</Icon>*/}
                  </span>
                </Tooltip>
              }
            />
          </RadioGroup>
        </Paper>

        <div
          className={cn(
            "space-y-4 relative",
            isPayInvertAccountType ? "pointer-events-none" : ""
          )}
        >
          <div className="flex justify-between items-center gap-4">
            <Typography variant="h6">Bank account</Typography>
            <Button
              startIcon={
                <Icon>
                  <Iconify icon="mdi:bank" />
                </Icon>
              }
            >
              Add a bank account
            </Button>
          </div>
          <Paper>
            <TanStandardTable
              instance={tableInstance}
              loading={banksQueryResult.isLoading}
              error={banksQueryResult.isError}
              onEmptyRetry={banksQueryResult.refetch}
              onErrorRetry={banksQueryResult.refetch}
            />
          </Paper>
          {isPayInvertAccountType ? (
            <div className="absolute inset-0 bg-gray-50/70 z-20" />
          ) : null}
        </div>
      </div>
    </>
  );
}

export const Component = PayoutAccountSetting;

export default PayoutAccountSetting;

const columns: ColumnDef<any, any>[] = [
  {
    header: "Bank Name",
    accessorKey: "bankName",
    cell: ({ getValue }) => {
      return (
        <div className="flex items-center gap-2">
          <Radio checked />
          <Typography>{getValue()}</Typography>
        </div>
      );
    },
  },
  {
    header: "Account number",
    accessorKey: "accountNumber",
  },
  {
    header: "Account Name",
    accessorKey: "accountName",
  },
  // {
  //   header: "Date Created",
  //   accessorKey: "dateCreated",
  //   cell: ({ getValue }) =>
  //     getValue() ? (
  //       <Typography>
  //         {dfns.format(getValue(), "dd-MMM-yyyy hh:mm:ss aaa")}
  //       </Typography>
  //     ) : (
  //       <Typography>--</Typography>
  //     ),
  // },
  {
    header: "Currency",
    accessorKey: "currency",
  },
  {
    header: "Actions",
    id: "actions",
    size: 80,
    cell: () => <PayoutAccountSettingTableAction />,
  },
];
