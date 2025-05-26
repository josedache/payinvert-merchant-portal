import { Chip, ChipProps } from "@mui/material";
import { Customer } from "types/customer.ts";

function CustomerStatus(props: CustomerStatusProps) {
  const { customer, ...restProps } = props;

  return (
    <Chip
      label={customer.status}
      color={customer.status === "Active" ? "success" : "error"}
      {...restProps}
    />
  );
}

export default CustomerStatus;

export type CustomerStatusProps = {
  customer: Customer;
} & ChipProps;
