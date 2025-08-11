import { Dialog, DialogContent, DialogProps } from "@mui/material";
import AssetPreviewer, { AssetPreviewerProps } from "./AssetPreviewer";
import DialogTitleXCloseButton from "./DialogTitleXCloseButton";
import useToggle from "hooks/use-toggle";
import LoadingContent, { LoadingContentProps } from "components/LoadingContent";
import { ReactNode } from "react";

function AssetPreviewerDialog(props: AssetPreviewerDialogProps) {
  const { title, children, onClose, slotProps, ...restProps } = props;

  const [isOpen, toggleOpen, setOpen] = useToggle();

  function handleClose(e?: any, reason?: any) {
    onClose?.(e, reason);
    setOpen(false);
  }

  return (
    <>
      <Dialog open={isOpen} fullWidth {...restProps}>
        <DialogTitleXCloseButton onClose={handleClose}>
          {title}
        </DialogTitleXCloseButton>
        <DialogContent>
          <LoadingContent {...slotProps?.loadingContent}>
            {() => <AssetPreviewer {...slotProps?.assetPreviewer} />}
          </LoadingContent>
        </DialogContent>
      </Dialog>
      {typeof children === "function"
        ? children?.({ isOpen, toggleOpen, setOpen })
        : children}
    </>
  );
}

export default AssetPreviewerDialog;

export type AssetPreviewerDialogProps = {
  title?: string;
  open?: boolean;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: (p: any) => void;
      }) => any);
  slotProps?: DialogProps["slotProps"] & {
    assetPreviewer?: AssetPreviewerProps;
    loadingContent?: LoadingContentProps;
  };
} & Omit<DialogProps, "children" | "open" | "slotProps">;
