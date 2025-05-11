import { isBase64DataURL } from "utils/file/is-base64-data-url.ts";

/**
 *
 * @param {string} dataUrl
 * @returns
 */
export function getBase64FileType(dataUrl?: string) {
  if (!(dataUrl && isBase64DataURL(dataUrl))) return "";

  return dataUrl?.substring(
    dataUrl?.indexOf("/") + 1,
    dataUrl?.indexOf(";base64")
  );
}
