import { Chip, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { walletApi } from "apis/wallet";
import TanStandardTable from "components/TanStandardTable";
import useTable from "hooks/use-table";
import usePagination from "hooks/use-pagination.ts";
import { useMemo } from "react";
import { Wallet } from "types/wallet";
import * as dfns from "date-fns";
import CurrencyTypography from "components/CurrencyTypography";

const Settlement = () => {
  const [pagination, setPagination] = usePagination();

  const walletTransactionsQueryResult = walletApi.useGetWalletTransactionsQuery(
    useMemo(
      () => ({
        params: {
          Page: pagination.pageIndex + 1,
          Limit: pagination.pageSize,
          Type: "Credit",
        },
      }),
      [pagination.pageIndex, pagination.pageSize]
    )
  );

  const walletTransactions = walletTransactionsQueryResult.data?.items;

  const tableInstance = useTable({
    data: walletTransactions,
    columns,
    // manualPagination: true,
    // pageCount: orders?.page?.totalPage ?? 1,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography variant="h6">
          Settlement - {walletTransactionsQueryResult?.data?.page?.total || 0}
        </Typography>
        <div className="flex gap-2 items-center">
          <TextField select size="small" label="Filter" className="w-24">
            {[
              {
                value: "all",
                label: "Export",
              },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField select size="small" label="Export" className="w-24">
            {[
              {
                value: "all",
                label: "Export",
              },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <Paper className="overflow-hidden">
        <TanStandardTable
          instance={tableInstance}
          loading={walletTransactionsQueryResult.isFetching}
          error={walletTransactionsQueryResult.isError}
          onEmptyRetry={walletTransactionsQueryResult.refetch}
          onErrorRetry={walletTransactionsQueryResult.refetch}
        />{" "}
      </Paper>
    </div>
  );
};
export const Component = Settlement;
export default Settlement;

const columns: ColumnDef<Wallet, any>[] = [
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ getValue }) =>
      getValue() ? (
        <Typography>
          {dfns.format(
            new Date(getValue()[0], getValue()[1] - 1, getValue()[2]),
            "dd MMM yyyy"
          )}
        </Typography>
      ) : null,
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ getValue }) => (
      <CurrencyTypography>{getValue()}</CurrencyTypography>
    ),
  },
  {
    header: "Direction",
    accessorKey: "direction",
    cell: ({ row }) => (
      <Chip
        label={row.original.debit ? "Debit" : "Credit"}
        color={row.original.debit ? "error" : "success"}
      />
    ),
  },
  {
    header: "Balance",
    accessorKey: "runningBalance",
    cell: ({ getValue }) => (
      <CurrencyTypography>{getValue()}</CurrencyTypography>
    ),
  },
  {
    header: "Details",
    accessorKey: "transactionType.value",
  },
  // {
  //   header: "Actions",
  //   id: "actions",
  //   size: 80,
  //   cell: () => <CardActionArea />,
  // },
];
