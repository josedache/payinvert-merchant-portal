import clsx from "clsx";
import { ComponentProps, forwardRef, useMemo } from "react";

const VideoPreviewer = forwardRef(
  /**
   *
   * @param {VideoPreviewerProps} props
   */
  function VideoPreviewer(props: VideoPreviewerProps, ref: any) {
    const { src, className, onLoad, ...rest } = props;
    const isFile = src instanceof File;
    const _src = useMemo(
      () => (isFile ? URL.createObjectURL(src) : src),
      [isFile, src]
    );

    return (
      <video
        ref={ref}
        className={clsx("VideoPreviewer", className)}
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
);

export default VideoPreviewer;

export type VideoPreviewerProps = { src: File | string } & Omit<
  ComponentProps<"video">,
  "src"
>;
