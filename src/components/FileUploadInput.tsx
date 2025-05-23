import { Icon } from "@iconify/react/dist/iconify.js";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { MAX_FILE_SIZE } from "constants/global";
import { useSnackbar } from "notistack";
import formatBytes from "utils/file/format-bytes";

type FileUploadInputProps = {
  fileRef?: React.RefObject<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxSize?: number;
} & TextFieldProps;

export default function FileUploadInput(props: FileUploadInputProps) {
  const {
    fileRef,
    slotProps,
    label,
    onChange,
    maxSize = MAX_FILE_SIZE,
    ...rest
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const restrictImageSize = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > maxSize) {
        enqueueSnackbar(
          `File is too big!, max size is ${formatBytes(maxSize)}`,
          {
            variant: "error",
          }
        );
        event.target.value = "";
      }
    }
  };

  return (
    <TextField
      {...rest}
      onChange={(event) => {
        restrictImageSize(event);
        onChange?.(event);
      }}
      label={label}
      type="file"
      inputRef={fileRef}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          endAdornment: (
            <InputAdornment position="end">
              <Icon icon="ic:outline-attach-file" width="20" height="20" />
            </InputAdornment>
          ),
        },
        inputLabel: {
          shrink: true,
        },
      }}
    />
  );
}
