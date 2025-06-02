import useTable from "hooks/use-table";
import {
  Button,
  Chip,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import { Icon } from "@iconify/react";
import usePagination from "hooks/use-pagination.ts";
import { useMemo } from "react";
import { walletApi } from "apis/wallet.ts";
import { Wallet } from "types/wallet.ts";
import { ColumnDef } from "@tanstack/react-table";
import * as dfns from "date-fns";
import CurrencyTypography from "components/CurrencyTypography.tsx";

const WalletHistory = () => {
  const [pagination, setPagination] = usePagination();

  const walletTransactionsQueryResult = walletApi.useGetWalletTransactionsQuery(
    useMemo(
      () => ({
        params: {
          Page: pagination.pageIndex + 1,
          Limit: pagination.pageSize,
        },
      }),
      [pagination.pageIndex, pagination.pageSize]
    )
  );

  const walletTransactions = walletTransactionsQueryResult.data;

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
        <div />{" "}
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

      <Paper>
        <TanStandardTable
          instance={tableInstance}
          loading={walletTransactionsQueryResult.isFetching}
          error={walletTransactionsQueryResult.isError}
          onEmptyRetry={walletTransactionsQueryResult.refetch}
          onErrorRetry={walletTransactionsQueryResult.refetch}
        />
      </Paper>
    </div>
  );
};
export const Component = WalletHistory;
export default WalletHistory;

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
  {
    header: "Actions",
    id: "actions",
    size: 80,
    cell: () => <Action />,
  },
];

const Action = () => {
  return (
    <Button
      variant="text"
      size="small"
      startIcon={<Icon icon="uil:ellipsis-v" />}
      className="text-black"
    />
  );
};
