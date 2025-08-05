import usePopover from "hooks/use-popover.ts";
import { Button, MenuItem, Popover } from "@mui/material";
import { Icon } from "@iconify/react";
import { CollectionAccount } from "types/collection-account.ts";

const UserTableAction = () => {
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
        {[{ children: "Delete" }].map(
          ({ children, ...menuItemProps }, index) => (
            <MenuItem key={index} {...menuItemProps}>
              {children}
            </MenuItem>
          )
        )}
      </Popover>
    </div>
  );
};

export default UserTableAction;

export type UserTableActionProps = {
  user: CollectionAccount;
};
