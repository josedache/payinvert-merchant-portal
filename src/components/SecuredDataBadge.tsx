import { Icon } from "@iconify/react/dist/iconify.js";
import { Typography } from "@mui/material";

export default function SecuredDataBadge() {
  return (
    <div className="inline-flex px-3 py-1 rounded-md items-center gap-[6px] font-medium bg-neutral-200">
      <Icon
        icon="mdi:security-lock"
        width="18"
        height="18"
        className="text-neutral-900"
      />
      <Typography
        variant="body2"
        className="text-neutral-600 font-medium select-none"
      >
        Your data is secure and encrypted
      </Typography>
    </div>
  );
}
