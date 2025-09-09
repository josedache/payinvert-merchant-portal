import usePopover from "hooks/use-popover";
import { Button, Icon, IconButton, Popover } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { generatePath, Link } from "react-router-dom";
import { PAYMENT_LINK_DETAIL } from "constants/urls";
import { PaymentLink } from "types/payment-link";
import useClipboard from "hooks/use-clipboard";
import { useSnackbar } from "notistack";
import { paymentLinkApi } from "apis/payment-link";
import { LoadingButton } from "@mui/lab";

const PaymentLinkTableAction = (props: PaymentLinkListActionProps) => {
  const { paymentLink } = props;

  const { enqueueSnackbar } = useSnackbar();

  const clipboard = useClipboard();

  const popover = usePopover();

  const [
    updatePaymentLinkStatusMutation,
    updatePaymentLinkStatusMutationResult,
  ] = paymentLinkApi.useUpdatePaymentLinkStatusMutation();

  const handleUpdatePaymentLinkStatus = async (reference, status) => {
    try {
      await updatePaymentLinkStatusMutation({
        params: {
          Action: status,
          Reference: reference,
        },
      }).unwrap();
      enqueueSnackbar(`Status updated successfully`, {
        variant: "success",
      });
      popover.togglePopover();
    } catch (error) {
      console.error("Failed to update payment link status:", error);
      enqueueSnackbar(`Failed to ${status} payment link`, {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <IconButton onClick={popover.togglePopover}>
        <Icon>
          <Iconify icon="uil:ellipsis-v" />
        </Icon>
      </IconButton>
      <Popover
        open={popover.isOpen}
        anchorEl={popover.anchorEl}
        onClose={popover.togglePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{ paper: { className: "w-48 bg-gray-50", elevation: 2 } }}
      >
        <div className="p-2 space-y-2 w-full">
          <LoadingButton
            fullWidth
            variant="text"
            onClick={() => {
              handleUpdatePaymentLinkStatus(
                paymentLink.reference,
                paymentLink?.isActive ? "Deactivate" : "Activate"
              );
            }}
            disabled={updatePaymentLinkStatusMutationResult?.isLoading}
            startIcon={<Iconify icon="ic:baseline-link-off" />}
            className="mb-2 text-black justify-start"
          >
            {paymentLink?.isActive ? "Deactivate" : "Activate"} link
          </LoadingButton>
          <Link
            to={generatePath(PAYMENT_LINK_DETAIL, {
              id: String(paymentLink.id),
            })}
          >
            <Button
              fullWidth
              variant="text"
              startIcon={<Iconify icon="icon-park-twotone:file-search-two" />}
              className="mb-2 text-black justify-start"
            >
              View details
            </Button>
          </Link>
          {paymentLink?.isActive && (
            <Button
              fullWidth
              variant="text"
              startIcon={<Iconify icon="iconamoon:copy-light" />}
              className="mb-2 text-black justify-start"
              onClick={() =>
                clipboard.writeText(paymentLink.paymentLinkUrl, () =>
                  enqueueSnackbar("Payment link copied to clipboard", {
                    variant: "success",
                  })
                )
              }
            >
              Copy link
            </Button>
          )}
        </div>
      </Popover>
    </div>
  );
};

export default PaymentLinkTableAction;

export type PaymentLinkListActionProps = {
  paymentLink: PaymentLink;
};
