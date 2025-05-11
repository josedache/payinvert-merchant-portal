import {
  ComponentPropsWithRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useMaskito } from "@maskito/react";
import { maskitoNumberOptionsGenerator } from "@maskito/kit";
import { maskitoTransform } from "@maskito/core";

const NumberInput = forwardRef(
  /**
   *
   * @param {NumberInputProps} props
   * @returns
   */
  function NumberInput(props: NumberInputProps, ref: any) {
    const {
      freeSolo,
      maskOptions,
      value = "",
      onChange,
      onInput,
      ...restProps
    } = props;
    const { precision, thousandSeparator, min, max } = maskOptions || {};

    const mainRef = useRef(null);

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

    useImperativeHandle(inputRef, () => mainRef.current);
    useImperativeHandle(ref, () => mainRef.current);

    function handleChange(e) {
      const value = e.target.value;
      e.target.value = value && value.replace(/\s|,/g, "");
      onChange?.(e);
      onInput?.(e);
    }

    return (
      <input
        ref={mainRef}
        value={value && maskitoTransform(String(value), options)}
        onInput={handleChange}
        {...restProps}
      />
    );
  }
);

export default NumberInput;

export type NumberInputProps = {
  freeSolo?: boolean;
  maskOptions?: MaskOptions;
} & ComponentPropsWithRef<"input">;

export type MaskOptions = {
  precision?: number;
  thousandSeparator: string;
  min: number;
  max: number;
};
