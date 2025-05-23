import { Icon } from "@iconify/react";
import { Button, Popover, Typography } from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import { PAYMENT_LINK_DETAIL } from "constants/urls";
import usePopover from "hooks/use-popover";
import useTable from "hooks/use-table";
import { generatePath, Link } from "react-router-dom";

const PaymentLinkDetailsTable = () => {
  const tableInstance = useTable({ data, columns });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography className="text-[18px] font-medium">Manscape</Typography>
        <div className="flex gap-2 items-center">
          <Button
            variant="outlined"
            startIcon={<Icon icon="mdi:pencil-outline" />}
          >
            Edit link
          </Button>
          <Button startIcon={<Icon icon="iconamoon:copy-light" />}>
            Copy link
          </Button>
        </div>
      </div>

      <TanStandardTable instance={tableInstance} pagination={false} />
    </div>
  );
};
export const Component = PaymentLinkDetailsTable;
export default PaymentLinkDetailsTable;

const data = [
  {
    dateCreated: "01 May 2021",
    type: "Product",
    linkUrl: "payinvert.com/manscape/green-suit",
  },
];

const columns = [
  {
    header: "Date created",
    accessorKey: "dateCreated",
  },
  {
    header: "Link type",
    accessorKey: "type",
  },
  {
    header: "Link URL",
    accessorKey: "linkUrl",
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
