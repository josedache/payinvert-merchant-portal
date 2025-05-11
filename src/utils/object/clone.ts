export function clone<T extends object>(instance: T): T {
  return Object.assign(
    Object.create(Object.getPrototypeOf(instance)),
    instance
  );
}
