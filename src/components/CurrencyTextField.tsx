import { InputAdornment } from "@mui/material";
import { forwardRef } from "react";
import NumberTextField, { NumberTextFieldProps } from "./NumberTextField";
import Currency from "enums/currency";

const CurrencyTextField = forwardRef(function CurrencyTextField(
  props: CurrencyTextFieldProps,
  ref: any
) {
  const { code, slotProps, ...restProps } = props;
  const currency = Currency[code || "NGN"];

  return (
    <NumberTextField
      ref={ref}
      slotProps={{
        ...slotProps,
        input: {
          startAdornment: (
            <InputAdornment position="start">{currency.symbol}</InputAdornment>
          ),
          ...(slotProps?.input as any)?.startAdornment,
        },
      }}
      {...restProps}
    />
  );
});

export default CurrencyTextField;

export type CurrencyTextFieldProps = {
  code: keyof typeof Currency;
} & NumberTextFieldProps;
