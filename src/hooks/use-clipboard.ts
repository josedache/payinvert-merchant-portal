import { useSnackbar } from "notistack";

export function useClipboard() {
  const { enqueueSnackbar } = useSnackbar();

  async function writeText(
    text = "",
    onSuccess = () => enqueueSnackbar("Copied!", { variant: "success" }),
    onError = (() =>
      enqueueSnackbar("Copy failed", { variant: "error" })) as any
  ) {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopyTextToClipboard(text);
      }
      onSuccess?.();
    } catch (error) {
      onError?.(error);
    }
  }

  return { writeText };
}

export default useClipboard;

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  // IOS fix
  // textArea.contentEditable = true
  // textArea.readOnly = false

  document.body.appendChild(textArea);
  textArea.focus();
  const isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);

  if (isiOSDevice) {
    const editable = textArea.contentEditable;
    const { readOnly } = textArea;

    textArea.contentEditable = true as unknown as string;
    textArea.readOnly = false;

    const range = document.createRange();
    range.selectNodeContents(textArea);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    textArea.setSelectionRange(0, 999999);
    textArea.contentEditable = editable;
    textArea.readOnly = readOnly;
  } else {
    textArea.select();
  }
  // textArea.select();
  // textArea.setSelectionRange(0, 99999); /* For mobile devices */

  document.execCommand("copy");
  document.body.removeChild(textArea);
}
