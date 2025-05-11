export function isObject(item: object) {
  // return Object.prototype.toString.call(o) === '[object Object]';
  return item && typeof item === "object" && !Array.isArray(item);
}

export default isObject;
