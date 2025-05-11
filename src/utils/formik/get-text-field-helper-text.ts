import access from "utils/object/access";

export function getTextFieldHelperText(
  formik: any,
  key: string,
  helperText?: any
) {
  return !!access(formik.touched, key) && access(formik.errors, key)
    ? access(formik.errors, key)
    : helperText;
}

export function getFormikTextFieldError(formik: any, key: string) {
  return !!access(formik.touched, key) && !!access(formik.errors, key);
}
