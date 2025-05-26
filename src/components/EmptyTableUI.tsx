import { Typography } from "@mui/material";
import clsx from "clsx";
import "./EmptyUI.css";
import { ComponentPropsWithoutRef } from "react";
import { Icon as Iconify } from "@iconify/react";

/**
 *
 * @param {EmptyTableUIProps} props
 * @returns
 */
export function EmptyTableUI(props: EmptyTableUIProps) {
  const { className, title, description, ...rest } = props;
  return (
    <div className={clsx("EmptyUI", className)} {...rest}>
      <div className={clsx("EmptyUI__icon")}>
        <Iconify icon="ph:empty-duotone" />
      </div>
      <Typography variant="h5" className={clsx("EmptyUI__text", "font-bold")}>
        {title || "No data"}
      </Typography>
      <Typography
        variant="subtitle2"
        className={clsx("EmptyUI__text", "text-sm text-[#475467] p-2")}
      >
        {description}
      </Typography>
    </div>
  );
}

export default EmptyTableUI;

export type EmptyTableUIProps = ComponentPropsWithoutRef<"div"> & {
  title?: string;
  description?: string;
};
