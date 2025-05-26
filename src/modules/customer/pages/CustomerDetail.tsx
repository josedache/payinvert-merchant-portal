import { Chip, IconButton, Paper, Popover, Typography } from "@mui/material";
import useTable from "hooks/use-table";
import { TextField, MenuItem } from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import { Icon } from "@iconify/react";
import usePopover from "hooks/use-popover";
import { getStatusColor } from "modules/settlement/pages/Settlement";

const CustomerDetail = () => {
  const tableInstance = useTable({ data, columns });
  return (
    <div className="space-y-8">
      <Paper className="overflow-hidden">
        <div className="py-2 px-4 bg-gray-200">
          <Typography variant="h6">Customer details</Typography>
        </div>
        <div className="p-4 space-y-4">
          <Detail label="Customer name" value="John Doe" />
          <Detail label="Customer email" value="john.doe@example.com" />
          <Detail label="Mobile number" value="+234 123 456 789" />
          <Detail label="Country" value="Nigeria" />
        </div>
      </Paper>

      <div className="space-y-6">
        <div className="flex justify-between items-center gap-4">
          <Typography variant="h6">Transactions</Typography>
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
    </div>
  );
};
export const Component = CustomerDetail;
export default CustomerDetail;

const Detail = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="grid grid-cols-2 items-center gap-2 ">
      <Typography className="font-semibold">{label}</Typography>
      <Typography>{value}</Typography>
    </div>
  );
};

const data = [
  {
    date: "Mar 01, 2023",
    amount: "NGN 10,000.00",
    channel: "Bank",
    reference: "1234567890",
    status: "Processing",
  },
  {
    date: "Mar 01, 2023",
    amount: "NGN 10,000.00",
    channel: "Bank",
    reference: "1234567890",
    status: "Completed",
  },
  {
    date: "Mar 01, 2023",
    amount: "NGN 10,000.00",
    channel: "Bank",
    reference: "1234567890",
    status: "Declined",
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
