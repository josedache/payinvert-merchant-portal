import { forwardRef, useMemo } from "react";
import { useMaskito } from "@maskito/react";
import { MaskitoOptions, maskitoTransform } from "@maskito/core";
import { TextField, TextFieldProps } from "@mui/material";
import { maskitoPhoneOptionsGenerator } from "@maskito/phone";
import metadata from "libphonenumber-js/mobile/metadata";
import type { CountryCode } from "libphonenumber-js/core";

const PhoneNumberTextField = forwardRef(
  /**
   *
   * @param {PhoneNumberTextFieldProps} props
   * @param {import("react").ComponentRef<typeof TextField>} ref
   * @returns
   */
  function PhoneNumberTextField(props: PhoneNumberTextFieldProps, ref: any) {
    const {
      countryIsoCode = "NG",
      value = "",
      onChange,
      onInput,
      ...restProps
    } = props;

    const options = useMemo(
      () =>
        maskitoPhoneOptionsGenerator({
          countryIsoCode,
          metadata,
        }) satisfies MaskitoOptions,
      [countryIsoCode]
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

export default PhoneNumberTextField;

export type PhoneNumberTextFieldProps = TextFieldProps & {
  countryIsoCode?: CountryCode;
};
