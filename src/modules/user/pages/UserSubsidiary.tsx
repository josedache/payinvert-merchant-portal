import {
  Button,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import useTable from "hooks/use-table";
import { Icon } from "@iconify/react";
import usePopover from "hooks/use-popover";
import { Link } from "react-router-dom";
import { SETTINGS_USERS } from "constants/urls";

const UserSubsidiary = () => {
  const tableInstance = useTable({
    data,
    columns,
  });

  return (
    <div className="space-y-6 mt-10">
      <div className="flex justify-between items-center gap-4">
        <Typography className="text-[18px] font-medium">
          Subsidiaries (20)
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
export const Component = UserSubsidiary;
export default UserSubsidiary;

const data = [
  {
    name: "Megatech",
    email: "mtech@email.com",
    country: "South Africa",
    users: 8,
    businessType: "Company",
  },
  {
    name: "CyberMunch",
    email: "cyber.munch@email.com",
    country: "Nigeria",
    users: 3,
    businessType: "Company",
  },
  {
    name: "Innovix",
    email: "innovix@email.com",
    country: "Nigeria",
    users: 7,
    businessType: "Company",
  },
  {
    name: "Avantex",
    email: "email@avantex.com",
    country: "Ghana",
    users: 9,
    businessType: "Individual",
  },
  {
    name: "Bitling",
    email: "mine@bitling.com",
    country: "Nigeria",
    users: 2,
    businessType: "Company",
  },
  {
    name: "Sphere",
    email: "sphere@email.com",
    country: "Kenya",
    users: 7,
    businessType: "Company",
  },
  {
    name: "Weblund",
    email: "weblund@email.com",
    country: "Nigeria",
    users: 10,
    businessType: "Individual",
  },
  {
    name: "Cloudmore",
    email: "cloudmore@email.com",
    country: "Nigeria",
    users: 5,
    businessType: "Company",
  },
  {
    name: "Smartsoft",
    email: "smartsoft@email.com",
    country: "Nigeria",
    users: 4,
    businessType: "Individual",
  },
  {
    name: "Digiwell",
    email: "digiwell@email.com",
    country: "Nigeria",
    users: 6,
    businessType: "Company",
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
    header: "Country",
    accessorKey: "country",
  },
  {
    header: "# of users",
    accessorKey: "users",
  },
  {
    header: "Business type",
    accessorKey: "businessType",
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
          <Link to={SETTINGS_USERS}>
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
