import { Typography, Icon } from "@mui/material";
import clsx from "clsx";
import "./EmptyUI.css";
import { ComponentPropsWithoutRef } from "react";
import { Icon as Iconify } from "@iconify/react";

/**
 *
 * @param {EmptyUIProps} props
 * @returns
 */
export function EmptyUI(props: EmptyUIProps) {
  const { className, ...rest } = props;
  return (
    <div className={clsx("EmptyUI", className)} {...rest}>
      <Icon className={clsx("EmptyUI__icon")}><Iconify icon="mage:file-records" /></Icon>
      <Typography variant="h6" className={clsx("EmptyUI__text")}>
        No data
      </Typography>
    </div>
  );
}

export default EmptyUI;

export type EmptyUIProps = ComponentPropsWithoutRef<"div">;
