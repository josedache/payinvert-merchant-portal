import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { useCallback, useState } from "react";

import * as CustomIcon from "assets/icons";
import { useDropzone } from "react-dropzone";
import ImagePreviewer from "components/ImagePreviewer";

const PaymentLinkProduct = () => {
  const [options, setOptions] = useState({
    physical: false,
    deliveryAddress: false,
    deliveryNote: false,
    sale: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const [file, setFile] = useState(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center justify-between">
        <Typography className="text-[18px] font-medium">Green Suit</Typography>

        <div className="flex items-center justify-between gap-4">
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Icon icon="iconoir:cancel" />}
            className="mb-2 text-black justify-start font-semibold"
          >
            Cancel
          </Button>
          <Button
            fullWidth
            startIcon={<Icon color="#fff" icon="fluent-mdl2:check-mark" />}
            className="mb-2 text-white justify-start font-semibold"
          >
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
        <div className="col-span-3">
          <Paper className="p-6">
            <Typography className="text-[18px] font-semibold text-[#0A0A0A]">
              Product information
            </Typography>

            <div className="space-y-6 mt-2">
              <TextField
                fullWidth
                label="Product name"
                placeholder="Enter your Product name"
                required
              />

              <TextField
                fullWidth
                label="Description"
                placeholder="Enter your description"
                multiline
                minRows={4}
              />

              <TextField
                fullWidth
                label="Price"
                placeholder="Enter your Price"
                type="number"
                inputMode="numeric"
                required
              />

              <Box className="space-y-0 m-0 p-0">
                <Typography className="text-base font-semibold text-[#424242]">
                  Quantity
                </Typography>

                <div className="space-y-6">
                  <div className="flex flex-col items-start">
                    <RadioGroup
                      name="limitType"
                      defaultValue="limited"
                      className="flex flex-col items-start "
                    >
                      <FormControlLabel
                        value="limited"
                        control={<Radio />}
                        label="Limited"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="unlimited"
                        control={<Radio />}
                        label="Unlimited"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </div>

                  <TextField
                    fullWidth
                    label="Quantity"
                    placeholder="Enter your Quantity"
                    type="number"
                    inputMode="numeric"
                    required
                  />
                </div>
              </Box>
            </div>
          </Paper>

          <Paper className="space-y-4 p-6">
            <Box>
              <Typography className="text-[18px] font-semibold text-[#0A0A0A]">
                Delivery
              </Typography>

              <div className="flex flex-col items-start mt-1">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="physical"
                      checked={options.physical}
                      onChange={handleChange}
                    />
                  }
                  label="This product contains one or more physical"
                  labelPlacement="end"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="deliveryAddress"
                      checked={options.deliveryAddress}
                      onChange={handleChange}
                    />
                  }
                  label="Require delivery address"
                  labelPlacement="end"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="deliveryNote"
                      checked={options.deliveryNote}
                      onChange={handleChange}
                    />
                  }
                  label="Require delivery note"
                  labelPlacement="end"
                />
              </div>
            </Box>

            <Divider className="m-0 p-0" />

            <Box className="flex items-center justify-between pt-3">
              <Typography className="text-base font-semibold text-[#424242]">
                Handling fee - NGN 2,500
              </Typography>

              <div>
                <IconButton>
                  <Iconify
                    fontSize={"24px"}
                    className="MuiIcon-root"
                    color="#19943C"
                    icon="mdi:pencil-outline"
                  />
                </IconButton>
                <IconButton>
                  <Iconify
                    fontSize={"24px"}
                    className="MuiIcon-root"
                    color="#E00000"
                    icon="mdi:bin-outline"
                  />
                </IconButton>
              </div>
            </Box>

            <Button
              startIcon={<CustomIcon.Rider />}
              fullWidth
              variant="contained"
              className="mt-4 font-semibold text-base"
            >
              Add delivery fee
            </Button>
          </Paper>

          <Paper className="space-y-4 p-6">
            <Box>
              <Typography className="text-[18px] font-semibold text-[#0A0A0A]">
                Sale
              </Typography>

              <div className="flex flex-col items-start mt-1 space-y-4">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="sale"
                      checked={options.sale}
                      onChange={handleChange}
                    />
                  }
                  label="This product is on sale"
                  labelPlacement="end"
                />

                <TextField
                  fullWidth
                  label="Sale price"
                  placeholder="Enter your Sale price"
                  type="number"
                  inputMode="numeric"
                  required
                />
              </div>
            </Box>
          </Paper>

          <Paper className="p-6">
            <Box>
              <Typography className="text-[18px] font-semibold text-[#0A0A0A]">
                Product URL
              </Typography>

              <div className="flex flex-col items-start mt-4 space-y-0">
                <TextField
                  fullWidth
                  label="Product URL"
                  placeholder="payinvert.com/manscape/green-suit"
                  type="text"
                />
                <Button
                  startIcon={<Icon icon="iconamoon:copy-light" />}
                  fullWidth
                  variant="contained"
                  className="mt-4 font-semibold text-base"
                >
                  Copy
                </Button>
              </div>
            </Box>
          </Paper>
        </div>

        <div className="col-span-2">
          <Paper className="p-6">
            <div>
              <Typography className="text-[18px] font-semibold text-[#0A0A0A]">
                Product image
              </Typography>
              <Typography className="text-[14px] font-normal text-[#616161]">
                Add up to 6 high quality product images
              </Typography>
            </div>

            <div className="space-y-4 mt-2">
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
                className="font-semibold text-base"
                fullWidth
                startIcon={
                  <Icon
                    fontSize={"20px"}
                    icon="icon-park-outline:add-picture"
                  />
                }
              >
                Add more images
              </Button>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar variant="rounded" className="w-20 h-20" />
                  <Typography className="text-base font-normal text-[#424242]">
                    Product image 1
                  </Typography>
                </div>

                <IconButton>
                  <Iconify
                    fontSize={"24px"}
                    className="MuiIcon-root"
                    color="#E00000"
                    icon="mdi:bin-outline"
                  />
                </IconButton>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};
export const Component = PaymentLinkProduct;
export default PaymentLinkProduct;
