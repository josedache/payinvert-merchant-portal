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
import { useMemo, useState } from "react";
import { walletApi } from "apis/wallet.ts";
import { Wallet } from "types/wallet.ts";
import { ColumnDef } from "@tanstack/react-table";
import * as dfns from "date-fns";
import CurrencyTypography from "components/CurrencyTypography.tsx";
import { DatePicker } from "@mui/x-date-pickers";

const WalletHistory = () => {
  const [pagination, setPagination] = usePagination();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const walletTransactionsQueryResult = walletApi.useGetWalletTransactionsQuery(
    useMemo(
      () => ({
        params: {
          ...(startDate && endDate ? { StartDate: startDate, endDate } : {}),
          Page: pagination.pageIndex + 1,
          Limit: 10,
        },
      }),
      [pagination.pageIndex, startDate, endDate]
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
          <div className="flex items-center gap-1">
            <DatePicker
              value={startDate} // Initial date range (optional)
              onChange={(value) => {
                setStartDate(value);
              }}
              format="dd/MM/yyyy" // Date format (default is "MM/dd/yyyy")
              slotProps={{
                textField: { size: "small" },
              }}
              disableFuture
              slots={{
                openPickerIcon: () => <Icon icon="solar:calendar-broken" />,
              }}
              className="max-w-[150px]"
            />
            -
            <DatePicker
              value={endDate}
              onChange={(value) => {
                setEndDate(value);
              }}
              format="dd/MM/yyyy"
              disableFuture
              slotProps={{
                textField: { size: "small" },
              }}
              slots={{
                openPickerIcon: () => <Icon icon="solar:calendar-broken" />,
              }}
              className="max-w-[150px]"
            />
          </div>
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
