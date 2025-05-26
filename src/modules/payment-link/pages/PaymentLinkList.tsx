import { Icon } from "@iconify/react";
import { Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import useTable from "hooks/use-table";
import { paymentLinkApi } from "apis/payment-link.ts";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PaymentLink } from "types/payment-link.ts";
import PaymentLinkStatus from "modules/payment-link/features/PaymentLinkStatus.tsx";
import CurrencyTypography from "components/CurrencyTypography.tsx";
import * as dfns from "date-fns";
import PaymentLinkCreateEdit from "modules/payment-link/features/PaymentLinkCreateEdit.tsx";
import PaymentLinkTableAction from "modules/payment-link/features/PaymentLinkTableAction.tsx";
import usePagination from "hooks/use-pagination.ts";

const PaymentLinkList = () => {
  const [pagination, setPagination] = usePagination();

  const paymentLinksQueryResult = paymentLinkApi.useGetPaymentLinksQuery(
    useMemo(
      () => ({
        params: { Page: pagination.pageIndex + 1, Limit: pagination.pageSize },
      }),
      [pagination.pageIndex, pagination.pageSize]
    )
  );

  const paymentLinks = paymentLinksQueryResult.data;

  const tableInstance = useTable({
    data: paymentLinks?.items,
    columns,
    manualPagination: true,
    pageCount: paymentLinks?.totalPages ?? 1,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography className="text-[18px] font-medium">
          Payment links - {paymentLinks?.totalItems ?? 0}
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
          <PaymentLinkCreateEdit>
            {({ toggleOpen }) => (
              <Button
                startIcon={<Icon icon="ic:twotone-receipt-long" />}
                onClick={toggleOpen}
              >
                Create new link
              </Button>
            )}
          </PaymentLinkCreateEdit>
        </div>
      </div>

      <Paper>
        <TanStandardTable
          instance={tableInstance}
          loading={paymentLinksQueryResult.isFetching}
          error={paymentLinksQueryResult.isError}
          onEmptyRetry={paymentLinksQueryResult.refetch}
          onErrorRetry={paymentLinksQueryResult.refetch}
        />
      </Paper>
    </div>
  );
};
export const Component = PaymentLinkList;
export default PaymentLinkList;

const columns: ColumnDef<PaymentLink, any>[] = [
  {
    header: "Link name",
    accessorKey: "name",
  },
  {
    header: "Type",
    accessorKey: "paymentType",
  },
  {
    header: "Limit",
    accessorKey: "limit",
    cell: ({ getValue }) =>
      getValue() === null ? (
        <Typography>No Limit</Typography>
      ) : (
        <CurrencyTypography>{getValue()}</CurrencyTypography>
      ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ getValue }) =>
      getValue() > 0 ? (
        <CurrencyTypography>{getValue()}</CurrencyTypography>
      ) : (
        <Typography>ANY AMOUNT</Typography>
      ),
  },
  {
    header: "Date Created",
    accessorKey: "dateCreated",
    cell: ({ getValue }) =>
      getValue() ? (
        <Typography>
          {dfns.format(getValue(), "dd-MMM-yyyy hh:mm:ss aaa")}
        </Typography>
      ) : (
        <Typography>--</Typography>
      ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <PaymentLinkStatus paymentLink={row.original} />,
  },
  {
    header: "Actions",
    id: "actions",
    size: 80,
    cell: ({ row }) => <PaymentLinkTableAction paymentLink={row.original} />,
  },
];
