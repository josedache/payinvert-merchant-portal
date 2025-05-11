import isObject from "./is-object";

/**
 * Deep merge two objects.
 * @template {object} T
 * @param {T} target
 * @param {any[]} ...sources
 */
export function mergeDeep<T extends object>(
  target: T,
  ...sources: any[]
): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (
    (isObject(target) && isObject(source)) ||
    (Array.isArray(target) && Array.isArray(source))
  ) {
    for (const key in source) {
      if (isObject(target[key as keyof T] as any) && isObject(source[key])) {
        // if (!target[key]) {
        //   target[key] = {};
        // }
        target[key as keyof T] = mergeDeep(
          target[key as keyof T] as any,
          source[key]
        );
      } else if (
        Array.isArray(target[key as keyof T] as any) &&
        Array.isArray(source[key])
      ) {
        // if (!target[key]) {
        //   target[key] = [];
        // }
        target[key as keyof T] = mergeDeep(
          target[key as keyof T] as any,
          source[key]
        );
      } else {
        target = { ...target, [key]: source[key] };
      }
    }
  }

  return mergeDeep(target, ...sources);
}
