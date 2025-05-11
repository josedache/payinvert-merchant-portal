import { TextField, InputAdornment, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import { Icon as Iconify } from "@iconify/react";

const SearchTextField = forwardRef(function SearchTextField(
  props: TextFieldProps,
  ref: any
) {
  const { slotProps, ...restProps } = props;

  return (
    <TextField
      ref={ref}
      placeholder="Search"
      size="small"
      slotProps={{
        ...slotProps,
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="lucide:search" fontSize={18} />
            </InputAdornment>
          ),
          ...(slotProps?.input as any)?.startAdornment,
        },
      }}
      {...restProps}
    />
  );
});

export default SearchTextField;
