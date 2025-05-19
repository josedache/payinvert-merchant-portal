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
import { PAYMENT_LINK_DETAIL } from "constants/urls";
import usePopover from "hooks/use-popover";
import useTable from "hooks/use-table";
import { generatePath, Link } from "react-router-dom";

const PaymentLink = () => {
  const tableInstance = useTable({ data, columns });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography className="text-[18px] font-medium">
          Payment links - 109
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
          <Button startIcon={<Icon icon="ic:twotone-receipt-long" />}>
            Create new link
          </Button>
        </div>
      </div>
      <TanStandardTable instance={tableInstance} />
    </div>
  );
};
export const Component = PaymentLink;
export default PaymentLink;

const data = [
  {
    linkName: "Manscape",
    type: "Subscription",
    limit: "44",
    amount: "NGN 1,000",
    status: "Active",
  },
  {
    linkName: "Donation",
    type: "One-off",
    limit: "No limit",
    amount: "NGN 3,000",
    status: "Active",
  },
  {
    linkName: "Hair oil",
    type: "Product",
    limit: "No limit",
    amount: "NGN 5,400",
    status: "Inactive",
  },
  {
    linkName: "Coffee Cuppa",
    type: "Subscription",
    limit: "No limit",
    amount: "NGN 7,000",
    status: "Active",
  },
  {
    linkName: "JP Leather Bag",
    type: "Product",
    limit: "7",
    amount: "NGN 8,000",
    status: "Active",
  },
  {
    linkName: "Foamclene",
    type: "Product",
    limit: "12",
    amount: "NGN 3,000",
    status: "Active",
  },
  {
    linkName: "Bookscout",
    type: "Subscription",
    limit: "50",
    amount: "NGN 11,000",
    status: "Inactive",
  },
  {
    linkName: "Cubbit Glasses",
    type: "Product",
    limit: "No limit",
    amount: "NGN 2,000",
    status: "Active",
  },
  {
    linkName: "Pop-up Funding",
    type: "One-off",
    limit: "No limit",
    amount: "NGN 4,500",
    status: "Inactive",
  },
  {
    linkName: "Shoe Shine Club",
    type: "Subscription",
    limit: "20",
    amount: "NGN 3,600",
    status: "Active",
  },
];

const columns = [
  {
    header: "Link name",
    accessorKey: "linkName",
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Limit",
    accessorKey: "limit",
  },
  {
    header: "Amount",
    accessorKey: "amount",
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
          <Button
            fullWidth
            variant="text"
            startIcon={<Icon icon="ic:baseline-link-off" />}
            className="mb-2 text-black justify-start"
          >
            Deactivate link
          </Button>
          <Link
            to={generatePath(PAYMENT_LINK_DETAIL, {
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
            startIcon={<Icon icon="iconamoon:copy-light" />}
            className="mb-2 text-black justify-start"
          >
            Copy link
          </Button>
        </div>
      </Popover>
    </div>
  );
};
