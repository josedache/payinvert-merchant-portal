import { Icon, IconButton } from "@mui/material";
import clsx from "clsx";
import useStepper from "hooks/use-stepper";
import AssetPreviewer, { AssetPreviewerProps } from "./AssetPreviewer";
import "./MultiPreviewer.css";
import { ComponentProps } from "react";

/**
 *
 * @param {MultiPreviewerProps} props
 * @returns
 */
function MultiPreviewer(props: MultiPreviewerProps) {
  const { srcs, slotProps, className, ...rest } = props;

  const stepper = useStepper();

  const src = srcs?.[stepper.step];

  return (
    <div className={clsx("MultiPreviewer", className)} {...rest}>
      <AssetPreviewer {...{ src, ...slotProps?.assetPreviewer }} />
      {!!srcs?.length && (
        <div
          className={clsx("MultiPreviewer__toolbar")}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex-1" />
          <IconButton
            size="small"
            className={clsx(
              "MultiPreviewer__navigator MultiPreviewer__navigatorLeft"
            )}
            onClick={() => stepper.previous()}
            disabled={!stepper.step}
          >
            <Icon>navigate_before</Icon>
          </IconButton>
          <IconButton
            size="small"
            className={clsx(
              "MultiPreviewer__navigator MultiPreviewer__navigatorRight"
            )}
            onClick={() => stepper.next()}
            disabled={!(stepper.step === srcs.length - 1)}
          >
            <Icon>navigate_next</Icon>
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default MultiPreviewer;

export type MultiPreviewerProps = {
  srcs: (string | File)[];
  slotProps: { assetPreviewer: AssetPreviewerProps };
} & ComponentProps<"div">;
