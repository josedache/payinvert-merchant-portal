/**
 * @template F
 * @param  {...F} funcs
 */
export function compose<F extends any[]>(...funcs: F) {
  if (!funcs.length) return (...args: any[]) => args;
  return funcs
    .slice()
    .reverse()
    .reduce(
      (a, b) =>
        (...args: any) =>
          a(b(...args))
    );
}
