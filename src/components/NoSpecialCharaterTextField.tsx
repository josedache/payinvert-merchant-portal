import { forwardRef, useMemo } from "react";
import { useMaskito } from "@maskito/react";
import { MaskitoOptions, maskitoTransform } from "@maskito/core";
import { TextField, TextFieldProps } from "@mui/material";

const NoSpecialCharacterTextField = forwardRef(
  /**
   *
   * @param {NoSpecialCharacterTextFieldProps} props
   * @param {import("react").ComponentRef<typeof TextField>} ref
   * @returns
   */
  function NoSpecialCharacterTextField(
    props: NoSpecialCharacterTextFieldProps,
    ref: any
  ) {
    const {
      allow = ["@", "&"],
      value = "",
      onChange,
      onInput,
      ...restProps
    } = props;

    const options = useMemo(
      () =>
        ({
          mask: new RegExp(`^[a-zA-Z0-9${allow?.join("") || ""}]+$`),
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

export default NoSpecialCharacterTextField;

export type NoSpecialCharacterTextFieldProps = TextFieldProps & {
  allow?: ("@" | "&")[];
};
