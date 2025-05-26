import { Chip, ChipProps } from "@mui/material";
import { PaymentLink } from "types/payment-link.ts";

function PaymentLinkStatus(props: PaymentLinkStatusProps) {
  const { paymentLink, ...restProps } = props;

  return (
    <Chip
      label={paymentLink.isActive ? "Active" : "Inactive"}
      color={paymentLink.isActive ? "success" : "error"}
      {...restProps}
    />
  );
}

export default PaymentLinkStatus;

export type PaymentLinkStatusProps = {
  paymentLink: PaymentLink;
} & ChipProps;
