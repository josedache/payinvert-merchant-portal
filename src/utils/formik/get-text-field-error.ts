import access from "utils/object/access";

export function getTextFieldError(formik: any, key: string) {
  return !!access(formik.touched, key) && !!access(formik.errors, key);
}
