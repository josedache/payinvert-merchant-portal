/* eslint-disable react-refresh/only-export-components */
import { Typography } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import TanStandardTable, {
  TanStandardTableProps,
} from "components/TanStandardTable";
import { Order } from "types/order.ts";
import * as dfns from "date-fns";
import CurrencyTypography from "components/CurrencyTypography.tsx";
import TransactionTableAction from "modules/transaction/features/TransactionTableAction.tsx";
import TransactionStatus from "modules/transaction/features/TransactionStatus.tsx";

function TransactionTable(props: TransactionTableProps) {
  return <TanStandardTable {...props} />;
}

export default TransactionTable;

export type TransactionTableProps = TanStandardTableProps;

export const columns: ColumnDef<Order, any>[] = [
  {
    header: "Date",
    accessorKey: "dateCreated",
    cell: ({ getValue }) =>
      getValue() ? (
        <Typography>{dfns.format(getValue(), "dd MMM yyyy")}</Typography>
      ) : null,
  },
  {
    header: "Email",
    accessorKey: "customerEmail",
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ getValue }) => (
      <CurrencyTypography>{getValue()}</CurrencyTypography>
    ),
  },
  {
    header: "Channel",
    accessorKey: "paymentTypeName",
  },
  {
    header: "Reference",
    accessorKey: "orderReference",
  },
  {
    header: "Status",
    accessorKey: "orderStatus",
    cell: ({ row }) => <TransactionStatus order={row.original} />,
  },
  {
    header: "Actions",
    id: "actions",
    size: 80,
    cell: ({ row }) => <TransactionTableAction order={row.original} />,
  },
];
