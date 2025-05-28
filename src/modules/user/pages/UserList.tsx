import {
  Button,
  Chip,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import useTable from "hooks/use-table";
import { Icon } from "@iconify/react";
import usePopover from "hooks/use-popover";
import { generatePath, Link } from "react-router-dom";
import { SETTINGS_USERS_SUBSIDIARIES } from "constants/urls";

const UserList = () => {
  const tableInstance = useTable({
    data,
    columns,
  });

  return (
    <div className="space-y-6 mt-10">
      <div className="flex justify-between items-center gap-4">
        <Typography className="text-[18px] font-medium">Users (8)</Typography>
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
          </TextField>{" "}
          <Button startIcon={<Icon icon="mdi:user-add-outline" />}>
            Add new customer
          </Button>
        </div>
      </div>

      <TanStandardTable instance={tableInstance} />
    </div>
  );
};
export const Component = UserList;
export default UserList;

const data = [
  {
    name: "Adegoke Darasimi",
    role: "Owner",
    email: "ade.dara@email.com",
    phone: "+234 9031511468",
    country: "Nigeria",
    status: "Active",
  },
  {
    name: "Tife Balogun",
    role: "Operations",
    email: "tife.balo@email.com",
    phone: "+234 7057051768",
    country: "Nigeria",
    status: "Active",
  },
  {
    name: "Moyin Olowu",
    role: "Developer",
    email: "momoyin@email.com",
    phone: "+234 8012914116",
    country: "Nigeria",
    status: "Inactive",
  },
  {
    name: "Usman Yakubu",
    role: "Collaborator",
    email: "usman.yakubu@email.com",
    phone: "+234 8135420312",
    country: "Nigeria",
    status: "Active",
  },
  {
    name: "Ayomide Oladele",
    role: "Operations",
    email: "ayo.ola@email.com",
    phone: "+234 8140564969",
    country: "Nigeria",
    status: "Active",
  },
  {
    name: "Benita Ubah",
    role: "Finance",
    email: "ubahbenita@email.com",
    phone: "+234 8135840161",
    country: "Nigeria",
    status: "Active",
  },
  {
    name: "Morenike Oni",
    role: "Operations",
    email: "nikeoni@email.com",
    phone: "+234 9142924224",
    country: "Nigeria",
    status: "Inactive",
  },
  {
    name: "Oluchi Uzo",
    role: "Collaborator",
    email: "oluchi.uzo@email.com",
    phone: "+234 7054504793",
    country: "Nigeria",
    status: "Active",
  },
  {
    name: "Mohammed Yusuf",
    role: "Collaborator",
    email: "mo.yusuf@email.com",
    phone: "+234 8059082176",
    country: "Nigeria",
    status: "Active",
  },
  {
    name: "Emmanuel Fayemi",
    role: "Owner",
    email: "emma.fayemi@email.com",
    phone: "+234 8135849068",
    country: "Nigeria",
    status: "Active",
  },
];

const columns = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone number",
    accessorKey: "phone",
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
            to={generatePath(SETTINGS_USERS_SUBSIDIARIES, {
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
        </div>
      </Popover>
    </div>
  );
};
