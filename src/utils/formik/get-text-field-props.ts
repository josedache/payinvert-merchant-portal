import { getTextFieldHelperTextAndError } from "utils/formik/get-text-field-helper-text-and-error";

/**
 * @param {*} formik
 * @param {*} key
 * @returns
 */
export function getTextFieldProps(formik: any, key: string, helperText?: any) {
  return {
    ...formik.getFieldProps(key),
    ...getTextFieldHelperTextAndError(formik, key, helperText),
  };
}
