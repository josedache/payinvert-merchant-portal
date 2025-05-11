import downloadUrl from "utils/url/download-url";

export function downloadAsPDF(base64: string, filename: string) {
  let base64String = base64.trim();
  let mimeType = "";
  let extension = "";

  if (base64String.startsWith("data:")) {
    // Already a data URI
    const match = base64String.match(/^data:(.+?);base64,/);
    if (match) {
      mimeType = match[1];
      extension = mimeType.split("/")[1];
    } else {
      return;
    }
  } else {
    // Raw base64, try to detect type
    if (base64String.startsWith("JVB")) {
      mimeType = "application/pdf";
      extension = "pdf";
    } else if (base64String.startsWith("/9j/")) {
      mimeType = "image/jpeg";
      extension = "jpg";
    } else if (base64String.startsWith("iVBOR")) {
      mimeType = "image/png";
      extension = "png";
    } else {
      return;
    }

    base64String = `data:${mimeType};base64,${base64String}`;
  }

  downloadUrl(base64String, `${filename}.${extension}`);
}
