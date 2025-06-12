import { Icon } from "@iconify/react";
import { Button, Paper, Typography } from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import useTable from "hooks/use-table";
import { PaymentLink } from "types/payment-link.ts";
import { ColumnDef } from "@tanstack/react-table";
import PaymentLinkTableAction from "modules/payment-link/features/PaymentLinkTableAction.tsx";
import { useMemo } from "react";
import useClipboard from "hooks/use-clipboard.ts";
import { useSnackbar } from "notistack";
import * as dfns from "date-fns";

const PaymentLinkDetailsTable = (props: PaymentLinkDetailsTableProps) => {
  const { paymentLink } = props;

  const { enqueueSnackbar } = useSnackbar();

  const clipboard = useClipboard();

  const tableInstance = useTable({
    data: useMemo(() => [paymentLink], [paymentLink]),
    columns,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography className="text-[18px] font-medium">
          {paymentLink?.name}
        </Typography>
        <div className="flex gap-2 items-center">
          <Button
            variant="outlined"
            startIcon={<Icon icon="mdi:pencil-outline" />}
          >
            Edit link
          </Button>
          <Button
            startIcon={<Icon icon="iconamoon:copy-light" />}
            onClick={() => {
              clipboard.writeText(paymentLink.paymentLinkUrl, () =>
                enqueueSnackbar("Payment link copied to clipboard", {
                  variant: "success",
                })
              );
            }}
          >
            Copy link
          </Button>
        </div>
      </div>
      <Paper className="overflow-hidden">
        <TanStandardTable instance={tableInstance} pagination={false} />
      </Paper>
    </div>
  );
};
export const Component = PaymentLinkDetailsTable;
export default PaymentLinkDetailsTable;

const columns: ColumnDef<PaymentLink, any>[] = [
  {
    header: "Date created",
    accessorKey: "dateCreated",
    cell: ({ getValue }) =>
      getValue() ? (
        <Typography noWrap>
          {dfns.format(getValue(), "dd-MMM-yyyy hh:mm:ss aaa")}
        </Typography>
      ) : (
        <Typography>--</Typography>
      ),
  },
  {
    header: "Link type",
    accessorKey: "paymentType",
  },
  {
    header: "Link URL",
    accessorKey: "paymentLinkUrl",
    cell: ({ getValue }) => <Typography noWrap>{getValue()}</Typography>,
  },
  {
    header: "Actions",
    id: "actions",
    size: 80,
    cell: ({ row }) => <PaymentLinkTableAction paymentLink={row.original} />,
  },
];

type PaymentLinkDetailsTableProps = { paymentLink: PaymentLink };
