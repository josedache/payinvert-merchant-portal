import { getTextFieldError } from "utils/formik/get-text-field-error";
import { getTextFieldHelperText } from "utils/formik/get-text-field-helper-text";

/**
 *
 * @param {*} formik
 * @param {*} key
 * @returns
 */
export function getTextFieldHelperTextAndError(
  formik: any,
  key: string,
  helperText?: any
) {
  return {
    error: getTextFieldError(formik, key),
    helperText: getTextFieldHelperText(formik, key, helperText),
  };
}
