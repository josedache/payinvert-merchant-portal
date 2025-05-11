import { useMemo } from "react";
import FileTypeZipSvg from "assets/svgs/file-type-zip.svg";
import AssetType from "enums/asset-type";
import { getAssetInfo } from "utils/file/get-asset-info";
import ImagePreviewer, { ImagePreviewerProps } from "./ImagePreviewer";
import VideoPreviewer, { VideoPreviewerProps } from "./VideoPreviewer";
import AudioPreviewer, { AudioPreviewerProps } from "./AudioPreviewer";
import PdfPreviewer, { PdfPreviewerProps } from "./PdfPreviewer";
import WordDocumentPreviewer, {
  WordDocumentPreviewerProps,
} from "./WordDocumentPreviewer";
import SpreadSheetPreviewer, {
  SpreadSheetPreviewerProps,
} from "./SpreadSheetPreviewer";

/**
 *
 * @param {AssetPreviewerProps} props
 */
function AssetPreviewer(props: AssetPreviewerProps) {
  const { src, slotProps, ...rest } = props;
  const assetInfo = useMemo(() => getAssetInfo(src), [src]);
  const type = (assetInfo.type?.toLowerCase() ?? assetInfo.type) as AssetType;

  if ([AssetType.JPEG, AssetType.JPG, AssetType.PNG].includes(type))
    return (
      <ImagePreviewer src={src} {...rest} {...slotProps?.imagePreviewer} />
    );

  if ([AssetType.WAV, AssetType.WEBM, AssetType.MP4].includes(type))
    return (
      <VideoPreviewer src={src} {...rest} {...slotProps?.videoPreviewer} />
    );

  if ([AssetType.MP3].includes(type))
    return (
      <AudioPreviewer src={src} {...rest} {...slotProps?.audioPreviewer} />
    );

  if ([AssetType.PDF].includes(type))
    return <PdfPreviewer src={src} {...rest} {...slotProps?.pdfPreviewer} />;

  if ([AssetType.DOC, AssetType.DOCX].includes(type))
    return (
      <WordDocumentPreviewer
        src={src}
        {...rest}
        {...slotProps?.wordDocumentPreviewer}
      />
    );

  if ([AssetType.XLS, AssetType.XLSX].includes(type))
    return (
      <SpreadSheetPreviewer
        src={src}
        {...rest}
        {...slotProps?.spreadSheetPreviewer}
      />
    );

  if ([AssetType.ZIP, AssetType.RAR, AssetType.ISO].includes(type))
    return (
      <ImagePreviewer
        src={FileTypeZipSvg}
        {...rest}
        {...slotProps?.imagePreviewer}
      />
    );

  return null;
}

export default AssetPreviewer;

export type AssetPreviewerProps = {
  src?: File | string;
  type?: keyof typeof AssetType;
  slotProps?: {
    imagePreviewer?: ImagePreviewerProps;
    videoPreviewer?: VideoPreviewerProps;
    audioPreviewer?: AudioPreviewerProps;
    pdfPreviewer?: PdfPreviewerProps;
    spreadSheetPreviewer?: SpreadSheetPreviewerProps;
    wordDocumentPreviewer?: WordDocumentPreviewerProps;
  };
};
