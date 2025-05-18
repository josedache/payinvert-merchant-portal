export default function firstCharToUpperCase(strList: string[]) {
  return strList.map((str) => {
    if (typeof str !== "string") {
      throw new Error("Input must be a string");
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
}
