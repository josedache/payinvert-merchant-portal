import { Chip } from "@mui/material";
import { Order } from "types/order.ts";

function TransactionStatus(props: TransactionStatusProps) {
  const { order } = props;

  return (
    <Chip
      label={order.orderStatus}
      color={
        order?.orderStatus === "Successful"
          ? "success"
          : order?.orderStatus === "Processing" ||
              order?.orderStatus === "Pending"
            ? "warning"
            : "error"
      }
    />
  );
}

export default TransactionStatus;

export type TransactionStatusProps = {
  order: Order;
};
