/**
 * @template {{}} T
 * @param {T} obj
 * @param {string} desc
 */
export function access<T>(obj: T, desc?: string) {
  const arr = desc ? desc.split(".") : [];
  let result = obj;
  while (arr.length && (result = result?.[arr.shift()]));
  return result;
}

export default access;
