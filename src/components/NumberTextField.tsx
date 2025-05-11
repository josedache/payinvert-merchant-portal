import { forwardRef, useMemo } from "react";
import { useMaskito } from "@maskito/react";
import { maskitoNumberOptionsGenerator } from "@maskito/kit";
import { maskitoTransform } from "@maskito/core";
import { TextField, TextFieldProps } from "@mui/material";

const NumberTextField = forwardRef(
  /**
   *
   * @param {NumberTextFieldProps} props
   * @returns
   */
  function NumberTextField(props: NumberTextFieldProps, ref: any) {
    const {
      freeSolo,
      maskOptions,
      value = "",
      onChange,
      onInput,
      ...restProps
    } = props;
    const { precision, thousandSeparator, min, max } = maskOptions || {};

    const options = useMemo(
      () => ({
        ...(freeSolo
          ? // { mask: /^[0-9]+$/i }
            { mask: new RegExp(`^[0-9]{${min || 1},${max ?? ""}}$`) }
          : maskitoNumberOptionsGenerator({
              precision: precision ?? 2,
              thousandSeparator: thousandSeparator ?? ",",
              min,
              max,
            })),
      }),
      [freeSolo, max, min, precision, thousandSeparator]
    );

    const inputRef = useMaskito({ options });

    function handleChange(e) {
      const value = e.target.value;
      e.target.value = value && value.replace(/\s|,/g, "");
      onChange?.(e);
      onInput?.(e);
    }

    return (
      <TextField
        ref={ref}
        inputRef={inputRef}
        value={value && maskitoTransform(String(value), options)}
        onInput={handleChange}
        {...restProps}
      />
    );
  }
);

export default NumberTextField;

export type NumberTextFieldProps = {
  freeSolo?: boolean;
  maskOptions?: MaskOptions;
} & TextFieldProps;

export type MaskOptions = {
  precision?: number;
  thousandSeparator: string;
  min: number;
  max: number;
};
