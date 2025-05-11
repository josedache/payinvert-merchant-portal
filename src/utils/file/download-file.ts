import downloadUrl from "utils/url/download-url";

/**
 *
 * @param {Blob} blob
 * @param {string} [fileName='file']
 */
export function downloadFile(blob: Blob, fileName = "file") {
  return downloadUrl(window.URL.createObjectURL(blob), fileName);
}

export default downloadFile;
