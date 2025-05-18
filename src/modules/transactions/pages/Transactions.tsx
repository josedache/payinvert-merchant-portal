import { Icon } from "@iconify/react";
import {
  Button,
  Chip,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import { TRANSACTION_DETAIL } from "constants/urls";
import usePopover from "hooks/use-popover";
import useTable from "hooks/use-table";
import { generatePath, Link } from "react-router-dom";
import { transactionData } from "../constants/transaction-table-data";

const Transactions = () => {
  const tableInstance = useTable({ data: transactionData, columns });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography>Transactions - 122</Typography>
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
export const Component = Transactions;
export default Transactions;

const columns = [
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Channel",
    accessorKey: "channel",
  },
  {
    header: "Reference",
    accessorKey: "reference",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Chip
        label={row.original.status}
        color={
          row.original.status === "Completed"
            ? "success"
            : row.original.status === "Processing"
              ? "warning"
              : "error"
        }
      />
    ),
  },
  {
    header: "Actions",
    id: "actions",
    size: 80,
    cell: () => <Action />,
  },
];

const Action = () => {
  const popover = usePopover();
  return (
    <div>
      <Button
        variant="text"
        size="small"
        startIcon={<Icon icon="uil:ellipsis-v" />}
        className="text-black"
        onClick={popover.togglePopover}
      />
      <Popover
        open={popover.isOpen}
        anchorEl={popover.anchorEl}
        onClose={popover.togglePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{ paper: { className: "w-48 bg-gray-50", elevation: 2 } }}
      >
        <div className="p-2 space-y-2 w-full">
          <Link
            to={generatePath(TRANSACTION_DETAIL, {
              id: "1",
            })}
          >
            <Button
              fullWidth
              variant="text"
              startIcon={<Icon icon="icon-park-twotone:file-search-two" />}
              className="mb-2 text-black justify-start"
            >
              View details
            </Button>
          </Link>
          <Button
            fullWidth
            variant="text"
            startIcon={<Icon icon="entypo:text-document" />}
            className="mb-2 text-black justify-start"
          >
            Refund
          </Button>
        </div>
      </Popover>
    </div>
  );
};
