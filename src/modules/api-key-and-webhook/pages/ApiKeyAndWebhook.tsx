import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import useClipboard from "hooks/use-clipboard";
import { subsidiaryApi } from "apis/subsidiary.ts";

const ApiKeyAndWebhook = () => {
  const clipboard = useClipboard();

  const keysQueryResult =
    subsidiaryApi.useGetSubsidiaryDashboardKeysNewQuery(undefined);

  const keys = keysQueryResult.data;

  const credentials = [
    { label: "Webhook URL", value: "https://yorubasiti.com" },
    {
      label: "Public key",
      value: keys?.apiKeys?.publicKey ?? "",
    },
    {
      label: "Secret key",
      value: keys?.apiKeys?.secretKey ?? "",
    },
    {
      label: "Encryption key",
      value: keys?.apiKeys?.encryptionKey ?? "",
    },
  ];

  return (
    <div className="space-y-8">
      {credentials.map((item, index) => (
        <Paper className="p-6 max-w-xl mx-auto">
          <Box className="space-y-6">
            <div key={index} className="space-y-4">
              <Typography className="text-[18px] font-semibold text-[#0A0A0A]">
                {item.label}
              </Typography>

              <div className="space-y-2 overflow-hidden">
                <Typography className="text-base font-medium text-[#424242] overflow-hidden text-ellipsis">
                  {item.value}
                </Typography>
                <Divider className="w-full bg-green-100" />
              </div>

              <Button
                onClick={() => clipboard.writeText(item?.value)}
                className="font-semibold"
                variant="contained"
                startIcon={<Icon icon="iconamoon:copy-light" />}
              >
                Copy
              </Button>
            </div>
          </Box>
        </Paper>
      ))}
    </div>
  );
};
export const Component = ApiKeyAndWebhook;
export default ApiKeyAndWebhook;
