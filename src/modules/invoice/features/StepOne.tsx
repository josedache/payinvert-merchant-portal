import {
  Button,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FormContentProps } from "../pages/AddInvoice";
import { Icon } from "@iconify/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ImagePreviewer from "components/ImagePreviewer";

const StepOne = ({ formik }: FormContentProps) => {
  const [file, setFile] = useState(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div className="space-y-6">
      <Paper className="p-5 space-y-4">
        <Typography variant="h6" className="font-semibold">
          Business details
        </Typography>

        <TextField
          label="Company name"
          placeholder="Enter company name"
          className="w-full"
          {...formik.getFieldProps("business.name")}
        />
        <TextField
          label="Company email"
          placeholder="Enter company email"
          className="w-full"
          {...formik.getFieldProps("business.email")}
        />
      </Paper>
      <Paper className="p-5 space-y-4">
        <Typography variant="h6" className="font-semibold">
          Business Logo
        </Typography>
        <div
          {...getRootProps()}
          className="border rounded-2xl border-dashed flex flex-col items-center justify-center p-6"
        >
          <input {...getInputProps()} accept="image/*" />
          {file ? (
            <ImagePreviewer src={file} />
          ) : (
            <div className="size-36 grid place-content-center rounded-2xl bg-gray-50 text-gray-400">
              <Icon icon="mdi:image-filter-hdr-outline" width={50} />
            </div>
          )}
        </div>
        <Button
          fullWidth
          startIcon={<Icon icon="icon-park-outline:add-picture" />}
        >
          Upload logo
        </Button>
        <div className="space-y-2">
          <Typography variant="body2" className="font-semibold">
            business-logo.jpg
          </Typography>
          <LinearProgress variant="determinate" value={40} />
          <div className="flex justify-between items-center gap-2">
            <Typography variant="body2">Uploading...</Typography>
            <Typography variant="body2" className="flex items-center">
              40%{" "}
              <span>
                <Icon icon="mdi:dot" />
              </span>{" "}
              10 secs left
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper className="p-5 space-y-4">
        <Typography variant="h6" className="font-semibold">
          Customer details
        </Typography>

        <TextField
          label="Customer name"
          placeholder="Enter customer name"
          className="w-full"
          {...formik.getFieldProps("business.name")}
        />
        <TextField
          label="Customer email"
          placeholder="Enter customer email"
          className="w-full"
          {...formik.getFieldProps("business.email")}
        />
      </Paper>
    </div>
  );
};

export default StepOne;
