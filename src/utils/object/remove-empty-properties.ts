import isObject from "utils/object/is-object.ts";

/**
 * @template {{}} T
 * @param {T} values
 * @param {{allowEmptyArray: boolean}} options
 * @returns
 */
export function removeEmptyProperties<T extends object>(
  values: T,
  options = {} as { allowEmptyArray?: boolean }
) {
  const { allowEmptyArray } = options;
  const newTarget = Array.isArray(values) ? [] : isObject(values) ? {} : values;

  if (typeof newTarget === "object") {
    for (const key in values) {
      const value = values[key];
      if (
        (Array.isArray(value) && (allowEmptyArray || value.length)) ||
        (isObject(value as any) && Object.entries(value).length !== 0)
      ) {
        newTarget[key as any] =
          value instanceof File ? value : removeEmptyProperties(value as object);
      } else if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !Array.isArray(value) &&
        !isObject(value as any)
      ) {
        newTarget[key as any] = removeEmptyProperties(value as object);
      }
    }
  }
  return newTarget;
}
