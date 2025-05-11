import { forwardRef } from "react";
import currencyjs from "currency.js";
import Currency from "enums/currency";
import { Typography, TypographyProps } from "@mui/material";
import clsx from "clsx";

export const CurrencyTypography = forwardRef(
  /**
   *
   * @param {CurrencyTypographyProps} props
   */
  function CurrencyTypography(props: CurrencyTypographyProps, ref: any) {
    const { children, currency, blur, className, ...rest } = props;
    const _currency = Currency[currency || "NGN"] || Currency.NGN;

    // const theme = useTheme();

    return (
      <Typography
        ref={ref}
        className={clsx("transition-all", blur ? "filter blur" : "", className)}
        {...rest}
      >
        {currencyjs(children || 0, { symbol: _currency.symbol }).format()}
      </Typography>
    );
  }
);

export default CurrencyTypography;

export type CurrencyTypographyProps = {
  currency?: keyof typeof Currency;
  children?: string | number;
  blur?: boolean;
} & Omit<TypographyProps, "children">;
