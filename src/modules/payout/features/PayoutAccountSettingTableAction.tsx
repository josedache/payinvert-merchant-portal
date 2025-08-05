import usePopover from "hooks/use-popover";
import { Button, MenuItem, Popover } from "@mui/material";
import { Icon } from "@iconify/react";

const PayoutAccountSettingTableAction = (
  // props: PayoutAccountSettingTableActionProps
) => {
  // const { bankAccount } = props;

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
        {[{ label: "Use Account" }].map(({ label, ...menuProps }) => (
          <MenuItem key={label} {...menuProps}>
            {label}
          </MenuItem>
        ))}
      </Popover>
    </div>
  );
};

export default PayoutAccountSettingTableAction;
//
// export type PayoutAccountSettingTableActionProps = {
//   // bankAccount: any;
// };
