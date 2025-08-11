import {
  Icon,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ComplianceUpdateContentProps } from "../types/compliance-update";
import { LoadingButton } from "@mui/lab";
import { getTextFieldError } from "utils/formik/get-text-field-error";
import { getTextFieldHelperText } from "utils/formik/get-text-field-helper-text";
import AssetPreviewerDialog from "components/AssetPreviewerDialog";
import { Icon as Iconify } from "@iconify/react";
import Dropzone from "react-dropzone";
import { useSnackbar } from "notistack";

function ComplianceUpdateBusinessRegistration(
  props: ComplianceUpdateBusinessRegistrationProps
) {
  const { formik, isView } = props;

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      className="w-full max-w-xl p-6 space-y-4"
    >
      <Typography variant="h6" className="font-semibold">
        Business Registration
      </Typography>

      <Dropzone
        multiple={false}
        maxSize={1024 * 1024 * 2}
        minSize={1}
        accept={{
          "image/*": ["jpeg", "png"],
          "application/*": [".pdf", ".doc", ".docx"],
        }}
        onDropAccepted={(files) => {
          formik.setFieldValue("CertificateOfIncorporation", files[0]);
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
                label: "Certificate of Incorporation",
                value:
                  formik.values.CertificateOfIncorporation instanceof File
                    ? formik.values.CertificateOfIncorporation?.name
                    : formik.values.CertificateOfIncorporation || "",
                fullWidth: true,
                disabled: isView,
                // margin: "normal",
                disableRipple: true,
                onClick: open,
                className: "flex items-center w-full cursor-pointer",
                error:
                  !!fileRejections?.[0]?.errors?.[0]?.message ||
                  getTextFieldError(formik, "CertificateOfIncorporation"),

                helperText:
                  fileRejections?.[0]?.errors?.[0]?.message ||
                  getTextFieldHelperText(
                    formik,
                    "CertificateOfIncorporation",
                    "Accepted file formats:  .jpg,  .png,  .pdf , Max. size: 10MB"
                  ),
                InputProps: {
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <div className="flex items-center gap-1">
                        {formik.values.CertificateOfIncorporation ? (
                          <div
                            className="contents"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            {formik.values.CertificateOfIncorporation instanceof
                            Blob ? (
                              <AssetPreviewerDialog
                                slotProps={{
                                  assetPreviewer: {
                                    src: formik.values
                                      .CertificateOfIncorporation,
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
                            ) : !isView ? (
                              <IconButton
                                onClick={() => {
                                  formik.setFieldValue(
                                    "CertificateOfIncorporation",
                                    null
                                  );
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

      <Dropzone
        multiple={false}
        maxSize={1024 * 1024 * 2}
        minSize={1}
        accept={{
          "image/*": ["jpeg", "png"],
          "application/*": [".pdf", ".doc", ".docx"],
        }}
        onDropAccepted={(files) => {
          formik.setFieldValue("MemoOfAssociation", files[0]);
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
                label: "Memorandum and Articles of Association",
                value:
                  formik.values.MemoOfAssociation instanceof File
                    ? formik.values.MemoOfAssociation?.name
                    : formik.values.MemoOfAssociation || "",
                fullWidth: true,
                disabled: isView,
                // margin: "normal",
                disableRipple: true,
                onClick: open,
                className: "flex items-center w-full cursor-pointer",
                error:
                  !!fileRejections?.[0]?.errors?.[0]?.message ||
                  getTextFieldError(formik, "MemoOfAssociation"),

                helperText:
                  fileRejections?.[0]?.errors?.[0]?.message ||
                  getTextFieldHelperText(
                    formik,
                    "MemoOfAssociation",
                    "Accepted file formats:  .jpg,  .png,  .pdf , Max. size: 10MB"
                  ),
                InputProps: {
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <div className="flex items-center gap-1">
                        {formik.values.MemoOfAssociation ? (
                          <div
                            className="contents"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            {formik.values.MemoOfAssociation instanceof Blob ? (
                              <AssetPreviewerDialog
                                slotProps={{
                                  assetPreviewer: {
                                    src: formik.values.MemoOfAssociation,
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
                            ) : !isView ? (
                              <IconButton
                                onClick={() => {
                                  formik.setFieldValue(
                                    "MemoOfAssociation",
                                    null
                                  );
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

export default ComplianceUpdateBusinessRegistration;

type ComplianceUpdateBusinessRegistrationProps =
  {} & ComplianceUpdateContentProps;
