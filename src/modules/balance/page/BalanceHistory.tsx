import useTable from "hooks/use-table";
import {
  Chip,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import { Icon } from "@iconify/react";

const BalanceHistory = () => {
  const tableInstance = useTable({ data, columns });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography variant="h6">Balance history - 20</Typography>
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

      <TanStandardTable instance={tableInstance} />
    </div>
  );
};
export const Component = BalanceHistory;
export default BalanceHistory;

const data = [
  {
    date: "Mar 01, 2023",
    amount: "NGN 10,000.00",
    direction: "Debit",
    balance: "NGN 10,000.00",
    details: "Invoice payment",
  },
  {
    date: "Mar 01, 2023",
    amount: "NGN 10,000.00",
    direction: "Credit",
    balance: "NGN 10,000.00",
    details: "Invoice payment",
  },
];
const columns = [
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Direction",
    accessorKey: "direction",
    cell: ({ row }) => (
      <Chip
        label={row.original.direction}
        color={row.original.direction === "Debit" ? "error" : "success"}
      />
    ),
  },
  {
    header: "Balance",
    accessorKey: "balance",
  },
  {
    header: "Details",
    accessorKey: "details",
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
    <IconButton>
      <Icon icon="uil:ellipsis-v" />
    </IconButton>
  );
};
