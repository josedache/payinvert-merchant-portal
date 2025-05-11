import { Typography } from "@mui/material";
import clsx from "clsx";
import "./EmptyUI.css";
import { ComponentPropsWithoutRef } from "react";
// import EmptyPlanSvg from "assets/svgs/empty-state.svg";

/**
 *
 * @param {EmptyTableUIProps} props
 * @returns
 */
export function EmptyTableUI(props: EmptyTableUIProps) {
  const { className, ...rest } = props;
  return (
    <div className={clsx("EmptyUI", className)} {...rest}>
      <div className={clsx("EmptyUI__icon")}>
        {/* <img src={EmptyPlanSvg} alt="no data icon" /> */}
      </div>
      <Typography
        variant="h3"
        className={clsx("EmptyUI__text", "font-bold text-xl")}
      ></Typography>
      <Typography
        variant="subtitle2"
        className={clsx("EmptyUI__text", "text-sm text-[#475467] p-2")}
      ></Typography>
    </div>
  );
}

export default EmptyTableUI;

export type EmptyTableUIProps = ComponentPropsWithoutRef<"div">;
