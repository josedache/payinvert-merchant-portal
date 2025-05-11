import { isBase64DataURL } from "utils/file/is-base64-data-url.ts";
import { getBase64FileType } from "utils/file/get-base64-file-type.ts";

export function getAssetInfo(src) {
  const result = { name: "src", type: "", mimeType: "" };
  if (src instanceof File) {
    result.name = src.name;
    result.type = src.name.slice(src.name.lastIndexOf(".") + 1)?.toLowerCase();
  } else if (typeof src === "string") {
    if (isBase64DataURL(src)) {
      result.name = "Base64";
      result.type = getBase64FileType(src);
    } else {
      result.name = src.slice(src.lastIndexOf("/") + 1);
      result.type = src.slice(src.lastIndexOf(".") + 1);
    }
  }

  result.mimeType =
    {
      jpg: "image/jpg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      mp4: "video/mp4",
      pdf: "application/pdf",
    }[result.type] || "application/octet-stream";
  return result;
}
