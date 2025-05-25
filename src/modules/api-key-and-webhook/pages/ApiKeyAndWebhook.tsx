import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import useClipboard from "hooks/use-clipboard";

const ApiKeyAndWebhook = () => {
  const { writeText } = useClipboard();
  const credentials = [
    { label: "Webhook URL", value: "https://yorubasiti.com" },
    {
      label: "Public key",
      value: "PA-PUBKEY-TESTcab23939–644f–46dd–94de–3f379cea1368",
    },
    {
      label: "Secret key",
      value: "PA-SECKEY-TEST–58d7fc77–2ab0–4a69–93de–d7b0bce203dd",
    },
    {
      label: "Encryption key",
      value: "NDA5NiE8UINBS2V5VmFsdWU+PE1vZHVsdXM+...",
    },
  ];

  return (
    <div className="space-y-8">
      {credentials.map((item, index) => (
        <Paper elevation={0} className="p-6 max-w-xl mx-auto">
          <Box className="space-y-6">
            <div key={index} className="space-y-4">
              <Typography className="text-[18px] font-semibold text-[#0A0A0A]">
                {item.label}
              </Typography>

              <div className="flex flex-col gap-2">
                <Typography className="text-base font-medium text-[#424242]">
                  {item.value}
                </Typography>
                <Divider className="w-full bg-green-100" />
              </div>

              <Button
                onClick={() => writeText(item?.value)}
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

      <Paper elevation={0} className="p-6 max-w-xl mx-auto">
        <Box className="space-y-6">
          <div className="space-y-4">
            <Typography className="text-[18px] font-semibold text-[#0A0A0A]">
              Webhook URL
            </Typography>

            <div className="flex flex-col gap-2">
              <Typography className="text-[18px] font-medium text-[#424242]">
                https://yorubasiti.com
              </Typography>

              <Divider className="w-full bg-green-100" />
            </div>
          </div>

          <Button
            className="font-semibold"
            variant="contained"
            startIcon={<Icon icon="iconamoon:copy-light" />}
          >
            Copy
          </Button>
        </Box>
      </Paper>
    </div>
  );
};
export const Component = ApiKeyAndWebhook;
export default ApiKeyAndWebhook;
