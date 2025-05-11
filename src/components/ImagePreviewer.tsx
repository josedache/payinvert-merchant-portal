import clsx from "clsx";
import { ComponentProps, useMemo } from "react";

/**
 *
 * @param {ImagePreviewerProps} props
 */
function ImagePreviewer(props: ImagePreviewerProps) {
  const { src, className, onLoad, ...rest } = props;
  const isFile = src instanceof File;
  const _src = useMemo(
    () => (isFile ? URL.createObjectURL(src) : src),
    [isFile, src]
  );

  return (
    <img
      alt="ImagePreviewer"
      className={clsx("ImagePreviewer", className)}
      src={_src}
      onLoad={(e) => {
        if (isFile) {
          URL.revokeObjectURL(_src);
        }
        onLoad?.(e);
      }}
      {...rest}
    />
  );
}

export default ImagePreviewer;

export type ImagePreviewerProps = {
  src?: File | string;
} & Omit<ComponentProps<"img">, "src">;
