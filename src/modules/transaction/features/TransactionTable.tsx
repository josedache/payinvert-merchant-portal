/* eslint-disable react-refresh/only-export-components */
import { Button, Chip, Popover } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import TanStandardTable, {
  TanStandardTableProps,
} from "components/TanStandardTable";
import usePopover from "hooks/use-popover";
import { Icon } from "@iconify/react/dist/iconify.js";
import { generatePath, Link } from "react-router-dom";
import { TRANSACTION_DETAIL } from "constants/urls";

function TransactionTable(props: TransactionTableProps) {
  return <TanStandardTable {...props} />;
}

export default TransactionTable;

export type TransactionTableProps = TanStandardTableProps;

export const transactionData = [
  {
    date: "01 May 2021",
    email: "gani@email.com",
    amount: "NGN 25,000",
    channel: "Bank account",
    reference: "yu89a657yht",
    status: "Processing",
  },
  {
    date: "09 Oct 2020",
    email: "tife.balo@email.com",
    amount: "NGN 5,000",
    channel: "Bank transfer",
    reference: "00hpbna711x",
    status: "Processing",
  },
  {
    date: "10 Feb 2020",
    email: "momoyin@email.com",
    amount: "NGN 10,000",
    channel: "Card payment",
    reference: "gt787pma21i",
    status: "Declined",
  },
  {
    date: "27 Jun 2021",
    email: "usman.yakubu@email.com",
    amount: "NGN 15,000",
    channel: "Bank transfer",
    reference: "87udb56troy",
    status: "Completed",
  },
  {
    date: "19 Apr 2021",
    email: "ayo.ola@email.com",
    amount: "NGN 6,000",
    channel: "Card payment",
    reference: "xc77ll01qwy",
    status: "Completed",
  },
  {
    date: "05 Jun 2021",
    email: "ubahbenita@email.com",
    amount: "NGN 4,500",
    channel: "USSD",
    reference: "09tkma3yu6t",
    status: "Completed",
  },
  {
    date: "26 Oct 2020",
    email: "nikeoni@email.com",
    amount: "NGN 8,000",
    channel: "Bank account",
    reference: "ob980yu7asd",
    status: "Declined",
  },
  {
    date: "23 Mar 2020",
    email: "oluchi.uzo@email.com",
    amount: "NGN 3,000",
    channel: "Card payment",
    reference: "pp12xcgh45y",
    status: "Completed",
  },
  {
    date: "17 Oct 2021",
    email: "mo.yusuf@email.com",
    amount: "NGN 9,000",
    channel: "QR code",
    reference: "ke789dgi870",
    status: "Completed",
  },
  {
    date: "09 Jun 2021",
    email: "emma.fayemi@email.com",
    amount: "NGN 20,000",
    channel: "Card payment",
    reference: "wkd342rus65",
    status: "Completed",
  },
];

export const transactionColumns: ColumnDef<any, any>[] = [
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
