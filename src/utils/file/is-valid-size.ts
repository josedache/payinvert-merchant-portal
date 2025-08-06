export function isValidSize(blob: Blob, maxSize = 5 * 1024 * 1024) {
  return blob.size <= maxSize;
}
