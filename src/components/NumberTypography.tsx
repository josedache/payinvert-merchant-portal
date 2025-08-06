import { forwardRef } from "react";
import currencyjs from "currency.js";
import { Typography, TypographyProps } from "@mui/material";
import clsx from "clsx";

export const NumberTypography = forwardRef(
  /**
   *
   * @param {NumberTypographyProps} props
   */
  function CurrencyTypography(props: NumberTypographyProps, ref: any) {
    const { children, blur, className, ...rest } = props;

    // const theme = useTheme();

    return (
      <Typography
        ref={ref}
        className={clsx("transition-all", blur ? "filter blur" : "", className)}
        {...rest}
      >
        {currencyjs(children || 0, { symbol: "", precision: 0 }).format()}
      </Typography>
    );
  }
);

export default NumberTypography;

export type NumberTypographyProps = {
  children?: string | number;
  blur?: boolean;
} & Omit<TypographyProps, "children">;
