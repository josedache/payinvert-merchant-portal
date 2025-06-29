import { Icon } from "@iconify/react";
import {
  Avatar,
  Button,
  Chip,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import { PAYMENT_LINK_PRODUCT_DETAIL } from "constants/urls";
import usePopover from "hooks/use-popover";
import useTable from "hooks/use-table";
import { generatePath, Link } from "react-router-dom";

const PaymentLinkProductList = () => {
  const tableInstance = useTable({ data, columns });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography className="text-[18px] font-medium">Product</Typography>
        <div className="flex gap-2 items-center">
          <Button startIcon={<Icon icon="codex:plus" />}>Add product</Button>
        </div>
      </div>

      <Paper className="overflow-hidden">
        <TanStandardTable instance={tableInstance} pagination={false} />
      </Paper>
    </div>
  );
};
export const Component = PaymentLinkProductList;
export default PaymentLinkProductList;

const data = [
  {
    productName: "Green suit",
    price: "NGN 25,000",
    availability: "In-stock",
    stockCount: 3,
    soldUnits: 2,
    revenue: "NGN 50,000",
    linkUrl: "payinvert.com/manscape/green-suit", // Assuming URL pattern
  },
];

const columns = [
  {
    header: "Product name",
    accessorKey: "productName",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16" variant="rounded" src="" />
        <Typography className="text-[15px] font-medium">
          {row.original.productName}
        </Typography>
      </div>
    ),
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Availability",
    accessorKey: "availability",
    cell: ({ row }) => (
      <Chip
        label={row.original.availability}
        color={row.original.availability === "In-stock" ? "success" : "error"}
      />
    ),
  },
  {
    header: "Stock count",
    accessorKey: "stockCount",
  },
  {
    header: "Sold",
    accessorKey: "soldUnits",
  },
  {
    header: "Revenue",
    accessorKey: "revenue",
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
            to={generatePath(PAYMENT_LINK_PRODUCT_DETAIL, {
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
