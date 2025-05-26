import usePopover from "hooks/use-popover.ts";
import { Button, Icon, IconButton, Popover } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { generatePath, Link } from "react-router-dom";
import { PAYMENT_LINK_DETAIL } from "constants/urls.ts";
import { PaymentLink } from "types/payment-link.ts";
import useClipboard from "hooks/use-clipboard.ts";
import { useSnackbar } from "notistack";

const PaymentLinkTableAction = (props: PaymentLinkListActionProps) => {
  const { paymentLink } = props;

  const { enqueueSnackbar } = useSnackbar();

  const clipboard = useClipboard();

  const popover = usePopover();

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
          <Button
            fullWidth
            variant="text"
            startIcon={<Iconify icon="ic:baseline-link-off" />}
            className="mb-2 text-black justify-start"
          >
            Deactivate link
          </Button>
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
        </div>
      </Popover>
    </div>
  );
};

export default PaymentLinkTableAction;

export type PaymentLinkListActionProps = {
  paymentLink: PaymentLink;
};
