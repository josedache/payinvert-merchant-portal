import { ComplianceUpdateContentProps } from "../types/compliance-update";
import {
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react/dist/iconify.js";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import { LoadingButton } from "@mui/lab";
import NumberTextField from "components/NumberTextField";
import Dropzone from "react-dropzone";
import { useSnackbar } from "notistack";
import { getTextFieldHelperText } from "utils/formik/get-text-field-helper-text";
import { getTextFieldError } from "utils/formik/get-text-field-error";
import AssetPreviewerDialog from "components/AssetPreviewerDialog";
import { subsidiaryEnumApi } from "apis/subsidiary-enum";
import BvnVerification from "features/BvnVerification";
import NoSpecialCharacterTextField from "components/NoSpecialCharaterTextField";

function ComplianceUpdateOwnerInfo(props: ComplianceUpdateOwnerInfoProps) {
  const { formik, complianceInfo, isView } = props;

  const { enqueueSnackbar } = useSnackbar();

  const documentTypeEnumsQueryResult =
    subsidiaryEnumApi.useGetDocumentTypeEnumsQuery(undefined);

  const documentTypeEnums = documentTypeEnumsQueryResult?.data || [];

  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      className="w-full max-w-xl p-6 space-y-4"
    >
      <Typography variant="h6" className="font-semibold">
        Owner Setup
      </Typography>

      <div className="grid grid-cols-1 gap-4">
        <NoSpecialCharacterTextField
          label="Full name"
          fullWidth
          disabled={isView}
          {...getTextFieldProps(
            formik,
            "FullName",
            "As per Government-issued ID"
          )}
        />

        <TextField
          label="Choose identification document"
          fullWidth
          disabled={isView}
          {...getTextFieldProps(formik, "DocumentType")}
          required
          select
        >
          {documentTypeEnums?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.description}
            </MenuItem>
          ))}
        </TextField>

        <Dropzone
          multiple={false}
          maxSize={1024 * 1024 * 10}
          minSize={1}
          accept={{
            "image/*": ["jpeg", "png"],
            "application/*": [".pdf", ".doc", ".docx"],
          }}
          onDropAccepted={(files) => {
            formik.setFieldValue("Identity", files[0]);
          }}
          onDropRejected={(files) => {
            try {
              for (const fileR of files) {
                for (const error of fileR.errors) {
                  enqueueSnackbar(error?.message || "Failed to attach file", {
                    variant: "error",
                  });
                }
              }
            } catch {}
          }}
          noClick
          disabled={isView}
        >
          {({ getRootProps, getInputProps, open, fileRejections }) => (
            <div>
              <input {...getInputProps()} />
              <TextField
                {...getRootProps({
                  label: "Upload document",
                  value:
                    formik.values.Identity instanceof File
                      ? formik.values.Identity?.name
                      : formik.values.Identity || "",
                  fullWidth: true,
                  disabled: isView,
                  // margin: "normal",
                  disableRipple: true,
                  onClick: open,
                  className: "flex items-center w-full cursor-pointer",
                  error:
                    !!fileRejections?.[0]?.errors?.[0]?.message ||
                    getTextFieldError(formik, "Identity"),

                  helperText:
                    fileRejections?.[0]?.errors?.[0]?.message ||
                    getTextFieldHelperText(
                      formik,
                      "Identity",
                      "Accepted file formats:  .jpg,  .png,  .pdf , Max. size: 10MB"
                    ),
                  InputProps: {
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <div className="flex items-center gap-1">
                          {formik.values.Identity ? (
                            <div
                              className="contents"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              {formik.values.Identity instanceof Blob ? (
                                <AssetPreviewerDialog
                                  slotProps={{
                                    assetPreviewer: {
                                      src: formik.values.Identity,
                                    },
                                  }}
                                >
                                  {({ toggleOpen }) => (
                                    <IconButton
                                      onClick={toggleOpen}
                                      variant="soft"
                                      color="primary"
                                      size="small"
                                    >
                                      <Icon fontSize="small">visibility</Icon>
                                    </IconButton>
                                  )}
                                </AssetPreviewerDialog>
                              ) : null}
                              {!isView ? (
                                <IconButton
                                  onClick={() => {
                                    formik.setFieldValue("Identity", null);
                                  }}
                                  size="small"
                                  variant="soft"
                                  color="error"
                                >
                                  <Iconify
                                    icon="material-symbols-light:delete"
                                    className="text-lg text-error-dark"
                                  />
                                </IconButton>
                              ) : null}
                            </div>
                          ) : null}
                          <Iconify
                            icon="ic:outline-attach-file"
                            className="text-lg"
                          />
                        </div>
                      </InputAdornment>
                    ),
                  },
                })}
              />
            </div>
          )}
        </Dropzone>

        <NumberTextField
          freeSolo
          maskOptions={{ min: 0, max: 11 }}
          {...getTextFieldProps(formik, "Bvn")}
          label="BVN"
          fullWidth
          disabled={isView}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {complianceInfo?.directorOrOwnerCompliance?.isBvnVerified &&
                  complianceInfo?.directorOrOwnerCompliance?.bvn ===
                    formik.values.Bvn ? (
                    <>
                      <Icon color="success">
                        <Iconify icon="ic:twotone-verified" />
                      </Icon>
                    </>
                  ) : !isView ? (
                    <>
                      <BvnVerification
                        fullName={formik.values.FullName}
                        bvn={formik.values.Bvn}
                      >
                        {({
                          formik: verificationFormik,
                          stepper,
                          sendOtp,
                          toggleOpen,
                        }) => (
                          <LoadingButton
                            size="small"
                            disabled={
                              !(
                                verificationFormik.values.fullname &&
                                verificationFormik.values.bvn
                              )
                            }
                            loading={verificationFormik.isSubmitting}
                            onClick={async () => {
                              verificationFormik.setSubmitting(true);

                              const data = await sendOtp(
                                formik.values.FullName,
                                formik.values.Bvn
                              );

                              if (data) {
                                stepper.next();
                                toggleOpen();
                              }

                              verificationFormik.setSubmitting(false);
                            }}
                          >
                            Verify
                          </LoadingButton>
                        )}
                      </BvnVerification>
                    </>
                  ) : null}
                </InputAdornment>
              ),
            },
          }}
        />
      </div>

      {!isView ? (
        <LoadingButton
          startIcon={
            <Iconify icon="humbleicons:check" width="20" height="20" />
          }
          fullWidth
          type="submit"
          loading={formik.isSubmitting}
        >
          Save
        </LoadingButton>
      ) : null}
    </Paper>
  );
}

export type ComplianceUpdateOwnerInfoProps = {} & ComplianceUpdateContentProps;

export default ComplianceUpdateOwnerInfo;
