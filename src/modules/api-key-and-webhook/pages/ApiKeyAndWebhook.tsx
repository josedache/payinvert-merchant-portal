import {
  Button,
  Icon,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import useClipboard from "hooks/use-clipboard";
import { subsidiaryApi } from "apis/subsidiary";
import PasswordTextField from "components/PasswordTextField";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { subsidiaryStaticAccountApi } from "apis/subsidiary-static-account";
import useAuthUser from "hooks/use-auth-user";
import LoadingContent from "components/LoadingContent";
import useToggle from "hooks/use-toggle";
import { getTextFieldProps } from "utils/formik/get-text-field-props";

const ApiKeyAndWebhook = () => {
  const { enqueueSnackbar } = useSnackbar();

  const clipboard = useClipboard();

  const authUser = useAuthUser();

  const [isEditWebhook, toggleEditWebhook] = useToggle(false);

  const [updateSubsidiaryStaticAccountDefaultWebhookNewMutation] =
    subsidiaryStaticAccountApi.useUpdateSubsidiaryStaticAccountDefaultWebhookNewMutation();

  const [
    regenerateSubsidiaryDashboardAuthNewKeyNewMutation,
    regenerateSubsidiaryDashboardAuthNewKeyNewMutationResult,
  ] = subsidiaryApi.useRegenerateSubsidiaryDashboardAuthNewKeyNewMutation();

  const webhookQueryResult =
    subsidiaryStaticAccountApi.useGetSubsidiaryStaticAccountDefaultWebhookViewNewQuery(
      undefined
    );

  const webhook = webhookQueryResult.data?.data;

  const keysQueryResult =
    subsidiaryApi.useGetSubsidiaryDashboardKeysNewQuery(undefined);

  const keys = keysQueryResult.data;

  const webhookFormik = useFormik({
    initialValues: { defaultWebhook: webhook?.callbackUrl ?? "" },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const data =
          await updateSubsidiaryStaticAccountDefaultWebhookNewMutation({
            body: {
              defaultWebhook: values.defaultWebhook,
              businessId: authUser?.businessDetails?.id,
            },
          }).unwrap();
        enqueueSnackbar(data?.message || "API Keys regenerated successfully!", {
          variant: "success",
        });
      } catch (e) {
        enqueueSnackbar(
          e?.message || e?.data?.message || "Failed to regenerate API Keys",
          {
            variant: "error",
          }
        );
      }
    },
  });

  async function handleRegenerateApiKeys() {
    try {
      const data = await regenerateSubsidiaryDashboardAuthNewKeyNewMutation({
        body: {},
      }).unwrap();
      enqueueSnackbar(data?.message || "API Keys regenerated successfully!", {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar(
        e?.message || e?.data?.message || "Failed to regenerate API Keys",
        {
          variant: "error",
        }
      );
    }
  }

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <Paper elevation={0} className="p-4 space-y-6">
        <Typography variant="h6">Webhook URL</Typography>
        <LoadingContent
          loading={webhookQueryResult.isLoading}
          error={webhookQueryResult.isError}
          onRetry={webhookQueryResult.refetch}
        >
          {() => (
            <>
              <TextField
                fullWidth
                disabled={!isEditWebhook}
                label="Webhook URL"
                placeholder="https://example.com/webhook"
                {...getTextFieldProps(webhookFormik, "defaultWebhook")}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        {webhook?.callbackUrl ? (
                          <IconButton
                            color="primary"
                            onClick={() =>
                              clipboard.writeText(webhook?.callbackUrl)
                            }
                          >
                            <Icon>
                              <Iconify icon="iconamoon:copy-light" />
                            </Icon>
                          </IconButton>
                        ) : null}
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <div className="flex gap-2 justify-end">
                {isEditWebhook ? (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      toggleEditWebhook();
                      webhookFormik.resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                ) : null}
                <LoadingButton
                  onClick={
                    (isEditWebhook
                      ? webhookFormik.handleSubmit
                      : toggleEditWebhook) as any
                  }
                  // disabled={!formik.isValid || !formik.dirty}
                  // size="large"
                  loading={webhookFormik.isSubmitting}
                  loadingPosition="end"
                  endIcon={<></>}
                >
                  {isEditWebhook ? "Update" : "Edit"} Webhook URL
                </LoadingButton>
              </div>
            </>
          )}
        </LoadingContent>
      </Paper>

      <Paper elevation={0} className="p-4 space-y-6">
        <Typography variant="h6">API Keys</Typography>
        <LoadingContent
          loading={keysQueryResult.isLoading}
          error={keysQueryResult.isError}
          onRetry={keysQueryResult.refetch}
        >
          {() => (
            <>
              {[
                {
                  label: "Public key",
                  value: keys?.apiKeys?.publicKey ?? "",
                },
                {
                  label: "Secret key",
                  value: keys?.apiKeys?.secretKey ?? "",
                  toggleVisibility: true,
                },
                {
                  label: "Encryption key",
                  value: keys?.apiKeys?.encryptionKey ?? "",
                },
              ].map((item, index) => {
                const Field = item.toggleVisibility
                  ? PasswordTextField
                  : TextField;

                return (
                  <div key={index}>
                    <Field
                      fullWidth
                      label={item.label}
                      value={item.value}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                color="primary"
                                onClick={() => clipboard.writeText(item?.value)}
                              >
                                <Icon>
                                  <Iconify icon="iconamoon:copy-light" />
                                </Icon>
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </div>
                );
              })}

              <div className="flex justify-end">
                <LoadingButton
                  onClick={handleRegenerateApiKeys}
                  loading={
                    regenerateSubsidiaryDashboardAuthNewKeyNewMutationResult.isLoading
                  }
                  loadingPosition="end"
                  endIcon={<></>}
                >
                  Regenerate API Keys
                </LoadingButton>
              </div>
            </>
          )}
        </LoadingContent>
      </Paper>
    </div>
  );
};
export const Component = ApiKeyAndWebhook;
export default ApiKeyAndWebhook;
