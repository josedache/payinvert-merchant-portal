import { getTextFieldProps } from "utils/formik/get-text-field-props.ts";

export function getCheckFieldProps(
  formik: any,
  key: string,
  checkedValue = true
  // unCheckedValue = false
) {
  const textFieldProps = getTextFieldProps(formik, key);

  const value =
    typeof checkedValue === "boolean"
      ? !!textFieldProps.value
      : textFieldProps.value;
  return {
    ...textFieldProps,
    value: value,
    checked: value === checkedValue,
  };
  // return {
  //   checked: !!formik.values[key],
  //   onChange: (e) => formik.setFieldValue(key, e.target.checked),
  // };
}
