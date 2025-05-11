import { CircularProgress, CircularProgressProps } from "@mui/material";
import { ComponentPropsWithRef, forwardRef } from "react";
import clsx from "clsx";
import "./LoadingIndicator.css";

const LoadingIndicator = forwardRef(function LoadingIndicator(
  props: LoadingIndicatorProps,
  ref: any
) {
  const { className, slotProps = {}, ...restProps } = props;

  const { circularProgress } = slotProps;

  return (
    <div
      ref={ref}
      className={clsx("LoadingIndicator", className)}
      {...restProps}
    >
      <CircularProgress thickness={1} size={60} {...circularProgress} />
    </div>
  );
});

export default LoadingIndicator;

export type LoadingIndicatorProps = {
  slotProps?: { circularProgress?: CircularProgressProps };
} & ComponentPropsWithRef<"div">;
