import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Icon,
  Typography,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { LoadingButton } from "@mui/lab";
import useToggle from "hooks/use-toggle";

/**
 *
 * @param {ConfirmationDialogProps} props
 */
function ConfirmationDialog(props: ConfirmationDialogProps) {
  const {
    isLoading,
    title = "Are you sure you want to continue?",
    description,
    children,
    triggerChildren,
    onCancel,
    onConfirm,
    ...restProps
  } = props;

  const [isOpen, toggleOpen, setOpen] = useToggle();

  function handleCancel() {
    onCancel?.();
    setOpen(false);
  }

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={isOpen} {...restProps}>
        <DialogContent className="space-y-8">
          <div className="flex flex-col items-center gap-2">
            <Icon color="warning" fontSize="inherit" className="text-6xl mb-4">
              <Iconify icon="mingcute:warning-fill" />
            </Icon>
            <Typography variant="h6" className="font-bold">
              {title}
            </Typography>
            <Typography variant="body1" className="text-text-secondary">
              {description}
            </Typography>
          </div>
          {typeof children === "string" ? (
            <Typography>{children}</Typography>
          ) : (
            children
          )}
        </DialogContent>
        <DialogActions className="justify-between px-4">
          <Button
            variant="outlined"
            disabled={isLoading}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            loadingPosition="end"
            endIcon={<></>}
            onClick={onConfirm}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {typeof triggerChildren === "function"
        ? triggerChildren({ isOpen, toggleOpen, setOpen })
        : triggerChildren}
    </>
  );
}

export default ConfirmationDialog;

export type ConfirmationDialogProps = {
  isLoading?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  open?: boolean;
  triggerChildren?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: Dispatch<SetStateAction<boolean>>;
      }) => ReactNode);
} & Omit<DialogProps, "title" | "open" | "id">;
