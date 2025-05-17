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
import { INVOICE_DETAIL } from "constants/urls";
import usePopover from "hooks/use-popover";
import useTable from "hooks/use-table";
import { generatePath, Link } from "react-router-dom";

const Invoices = () => {
  const tableInstance = useTable({ data, columns });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography>Invoice - 20</Typography>
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
          <Button startIcon={<Icon icon="ic:twotone-receipt-long" />}>
            New Invoice
          </Button>
        </div>
      </div>
      <TanStandardTable instance={tableInstance} />
    </div>
  );
};
export const Component = Invoices;
export default Invoices;

const data = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    invoiceNumber: "INV-001",
    amount: "NGN 10,000.00",
    date: "Mar 01, 2023",
    status: "Paid",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    invoiceNumber: "INV-001",
    amount: "NGN 10,000.00",
    date: "Mar 01, 2023",
    status: "Unpaid",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    invoiceNumber: "INV-001",
    amount: "NGN 10,000.00",
    date: "Mar 01, 2023",
    status: "Unpaid",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    invoiceNumber: "INV-001",
    amount: "NGN 10,000.00",
    date: "Mar 01, 2023",
    status: "Paid",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    invoiceNumber: "INV-001",
    amount: "NGN 10,000.00",
    date: "Mar 01, 2023",
    status: "Unpaid",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    invoiceNumber: "INV-001",
    amount: "NGN 10,000.00",
    date: "Mar 01, 2023",
    status: "Unpaid",
  },
];
const columns = [
  {
    header: "Customer name",
    accessorKey: "name",
  },
  {
    header: "Company email",
    accessorKey: "email",
  },
  {
    header: "Invoice number",
    accessorKey: "invoiceNumber",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Date issued",
    accessorKey: "date",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Chip
        label={row.original.status}
        color={row.original.status === "Paid" ? "success" : "error"}
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
          <Button
            fullWidth
            variant="text"
            startIcon={<Icon icon="mdi:pencil-outline" />}
            className="mb-2 text-black justify-start"
          >
            Edit invoice
          </Button>
          <Button
            fullWidth
            variant="text"
            startIcon={<Icon icon="iconamoon:copy-light" />}
            className="mb-2 text-black justify-start"
          >
            Copy invoice link
          </Button>
          <Link to={generatePath(INVOICE_DETAIL, { id: "1" })}>
            <Button
              fullWidth
              variant="text"
              startIcon={<Icon icon="fluent:document-search-16-regular" />}
              className="mb-2 text-black justify-start"
            >
              View invoice
            </Button>
          </Link>
        </div>
      </Popover>
    </div>
  );
};
