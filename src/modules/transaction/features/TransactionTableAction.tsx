import usePopover from "hooks/use-popover.ts";
import { Button, Popover } from "@mui/material";
import { Icon } from "@iconify/react";
import { generatePath, Link } from "react-router-dom";
import { TRANSACTION_DETAIL } from "constants/urls.ts";
import { Order } from "types/order.ts";

const TransactionTableAction = (props: TransactionTableActionProps) => {
  const { order } = props;

  const popover = usePopover();
  
  return (
    <div>
      <Button
        variant="text"
        size="small"
        startIcon={<Icon icon="uil:ellipsis-v" />}
        className="text-black"
        onClick={popover.togglePopover}
      />
      <Popover
        open={popover.isOpen}
        anchorEl={popover.anchorEl}
        onClose={popover.togglePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{ paper: { className: "w-48 bg-gray-50", elevation: 2 } }}
      >
        <div className="p-2 space-y-2 w-full">
          <Link
            to={generatePath(TRANSACTION_DETAIL, {
              id: order.id?.toString(),
            })}
          >
            <Button
              fullWidth
              variant="text"
              startIcon={<Icon icon="icon-park-twotone:file-search-two" />}
              className="mb-2 text-black justify-start"
            >
              View details
            </Button>
          </Link>
          <Button
            fullWidth
            variant="text"
            startIcon={<Icon icon="entypo:text-document" />}
            className="mb-2 text-black justify-start"
          >
            Refund
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default TransactionTableAction;

export type TransactionTableActionProps = {
  order: Order;
};
