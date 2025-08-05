import { Chip, ChipProps } from "@mui/material";
import { Customer } from "types/customer";

function UserStatus(props: UserStatusProps) {
  const { user, ...restProps } = props;

  return (
    <Chip
      label={user.status}
      color={user.status === "Active" ? "success" : "error"}
      {...restProps}
    />
  );
}

export default UserStatus;

export type UserStatusProps = {
  user?: Customer;
} & ChipProps;
