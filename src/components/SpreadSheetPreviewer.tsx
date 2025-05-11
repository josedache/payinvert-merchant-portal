import ImagePreviewer from "./ImagePreviewer";
import SpreadSheetDocSvg from "assets/svgs/file-type-spreadsheet-doc.svg";
import clsx from "clsx";
import { ComponentProps } from "react";

/**
 *
 * @param {SpreadSheetPreviewerProps} props
 */
function SpreadSheetPreviewer(props: SpreadSheetPreviewerProps) {
  const { className, ...rest } = props;
  return (
    <ImagePreviewer
      className={clsx("p-2", className)}
      {...rest}
      src={SpreadSheetDocSvg}
    />
  );
}

export default SpreadSheetPreviewer;

export type SpreadSheetPreviewerProps = { src: File | string } & Omit<
  ComponentProps<"img">,
  "src"
>;
