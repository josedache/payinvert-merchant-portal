import { Icon } from "@iconify/react";
import {
  Button,
  Chip,
  IconButton,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import { CUSTOMER_DETAIL } from "constants/urls";
import usePopover from "hooks/use-popover";
import useTable from "hooks/use-table";
import { generatePath, Link } from "react-router-dom";
import * as CustomIcon from "assets/icons";

const Customer = () => {
  const tableInstance = useTable({ data, columns });
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography variant="h6">Customers - 20</Typography>
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

          <Button startIcon={<CustomIcon.UserAdd />}>Add new customer</Button>
        </div>
      </div>

      <TanStandardTable instance={tableInstance} />
    </div>
  );
};
export const Component = Customer;
export default Customer;

const data = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+234 123 456 789",
    country: "Nigeria",
    status: "Active",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+234 123 456 789",
    country: "Nigeria",
    status: "Blacklisted",
  },
];
const columns = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Mobile number",
    accessorKey: "phoneNumber",
  },
  {
    header: "Country",
    accessorKey: "country",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Chip
        label={row.original.status}
        color={row.original.status === "Active" ? "success" : "error"}
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
          <Link to={generatePath(CUSTOMER_DETAIL, { id: "1" })}>
            <Button
              fullWidth
              variant="text"
              startIcon={<Icon icon="formkit:eye" />}
              className="text-black justify-start"
            >
              View customer
            </Button>
          </Link>
        </div>
      </Popover>
    </div>
  );
};
