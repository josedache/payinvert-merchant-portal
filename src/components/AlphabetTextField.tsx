import { forwardRef, useMemo } from "react";
import { useMaskito } from "@maskito/react";
import { MaskitoOptions, maskitoTransform } from "@maskito/core";
import { TextField, TextFieldProps } from "@mui/material";

const AlphabetTextField = forwardRef(
  /**
   *
   * @param {AlphabetTextFieldProps} props
   * @param {import("react").ComponentRef<typeof TextField>} ref
   * @returns
   */
  function AlphabetTextField(props: AlphabetTextFieldProps, ref: any) {
    const { value = "", onChange, onInput, ...restProps } = props;

    const options = useMemo(
      () =>
        ({
          mask: /^[a-z]+$/i,
        }) satisfies MaskitoOptions,
      []
    );

    const inputRef = useMaskito({ options });

    function handleChange(e) {
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

export default AlphabetTextField;

export type AlphabetTextFieldProps = TextFieldProps;
