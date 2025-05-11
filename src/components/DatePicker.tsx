import { DatePicker as MuiDatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { forwardRef } from "react";
import DatePickerTextField from "./DatePickerTextField";

const DatePicker = forwardRef(function DatePicker(
  props: DatePickerProps<any>,
  ref: any
) {
  return (
    <MuiDatePicker
      ref={ref}
      {...props}
      slots={{ textField: DatePickerTextField, ...props.slots }}
    />
  );
});

export default DatePicker;
