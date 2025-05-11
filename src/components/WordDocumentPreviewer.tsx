import ImagePreviewer from "./ImagePreviewer";
import WordDocSvg from "assets/svgs/file-type-word-doc.svg";
import clsx from "clsx";
import { ComponentProps } from "react";

/**
 *
 * @param {WordDocumentPreviewerProps} props
 */
function WordDocumentPreviewer(props) {
  const { className, ...rest } = props;
  return (
    <ImagePreviewer
      className={clsx("p-2", className)}
      {...rest}
      src={WordDocSvg}
    />
  );
}

export default WordDocumentPreviewer;

export type WordDocumentPreviewerProps = { src: File | string } & Omit<
  ComponentProps<"img">,
  "src"
>;
