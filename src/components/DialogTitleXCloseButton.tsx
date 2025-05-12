import { DialogTitle, DialogTitleProps, IconButton } from "@mui/material";
import clsx from "clsx";
import { Icon as Iconify } from "@iconify/react";

function DialogTitleXCloseButton(props: DialogTitleXCloseButtonProps) {
  const { children, onClose, className, ...other } = props;

  return (
    <DialogTitle className={clsx("", className)} {...other}>
      {children}

      {onClose ? (
        <IconButton
          className="absolute right-2 top-3 text-inherit"
          aria-label="close"
          onClick={onClose}
        >
          <Iconify className="text-[24px]" icon="material-symbols:close" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default DialogTitleXCloseButton;

export type DialogTitleXCloseButtonProps = {
  onClose?: () => void;
} & DialogTitleProps;
