/**
 *
 * @param {string} url
 * @param {string} [fileName='file']
 * @param {string} target
 */
export function downloadUrl(url: string, fileName = "file", target?: string) {
  if (!url) return;

  const link = document.createElement("a");
  link.href = url;
  link.target = target || undefined;

  link.setAttribute("downloadUrl", fileName);
  document.body.appendChild(link);
  link.click();
}

export default downloadUrl;
