import { Icon } from "@iconify/react";
import {
  Chip,
  IconButton,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import usePopover from "hooks/use-popover";
import useTable from "hooks/use-table";

const Settlement = () => {
  const tableInstance = useTable({ data, columns });
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography variant="h6">Settlements - 20</Typography>
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
export const Component = Settlement;
export default Settlement;

const data = [
  {
    name: "John Doe",
    amount: "NGN 10,000.00",
    settlement_fee: "NGN 100.00",
    currency: "NGN",
    status: "Active",
  },
  {
    name: "John Doe",
    amount: "NGN 10,000.00",
    settlement_fee: "NGN 100.00",
    currency: "NGN",
    status: "Processing",
  },
  {
    name: "John Doe",
    amount: "NGN 10,000.00",
    settlement_fee: "NGN 100.00",
    currency: "NGN",
    status: "Failed",
  },
];
const columns = [
  {
    header: "Business name",
    accessorKey: "name",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Settlement fee",
    accessorKey: "settlement_fee",
  },
  {
    header: "Currency",
    accessorKey: "currency",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Chip
        label={row.original.status}
        color={getStatusColor(row.original.status)}
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
      <IconButton onClick={popover.togglePopover}>
        <Icon icon="uil:ellipsis-v" />
      </IconButton>
      <Popover
        open={popover.isOpen}
        anchorEl={popover.anchorEl}
        onClose={popover.togglePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{ paper: { className: "w-48 bg-gray-50", elevation: 2 } }}
      >
        <div className="p-2 space-y-2 w-full">
          {/* <Link to={generatePath(INVOICE_EDIT, { id: "1" })}>
            <Button
              fullWidth
              variant="text"
              startIcon={<Icon icon="mdi:pencil-outline" />}
              className="mb-2 text-black justify-start"
            >
              Edit invoice
            </Button>
          </Link>
          <Button
            fullWidth
            variant="text"
            startIcon={<Icon icon="iconamoon:copy-light" />}
            className="mb-2 text-black justify-start"
          >
            Copy invoice link
          </Button> */}
        </div>
      </Popover>
    </div>
  );
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Processing":
      return "warning";
    case "Failed":
      return "error";
    default:
      return "success";
  }
};
