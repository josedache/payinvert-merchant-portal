import { TextField } from "@mui/material";
import { forwardRef } from "react";

const DatePickerTextField = forwardRef(function DatePickerTextField(
  props: any,
  ref: any
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ownerState, ...restProps } = props;
  return <TextField ref={ref} {...restProps} />;
});

export default DatePickerTextField;
