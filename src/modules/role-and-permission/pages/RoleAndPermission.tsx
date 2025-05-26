import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { Icon } from "@iconify/react";
const RoleAndPermission = () => {
  const permissions = [
    { label: "Add new business", allowed: false },
    { label: "Add new user", allowed: false },
    { label: "Create payment links", allowed: true },
    { label: "Switch Business from test to live, vice–versa", allowed: false },
    { label: "Onboard a new business", allowed: true },
    { label: "Add new admins", allowed: false },
    { label: "Add & edit permissions & roles", allowed: true },
    { label: "Create virtual wallets", allowed: true },
    { label: "Make payouts", allowed: true },
  ];

  const roles = [
    "Owner (3)",
    "Operations (2)",
    "Owner (3)",
    "Developer",
    "Finance (2)",
    "Initiator",
  ];
  return (
    <div className="flex flex-wrap items-start justify-center relative gap-2">
      <div className="md:absolute left-0 space-y-6 p-4">
        {roles.map((role, index) => (
          <Typography
            key={index}
            className="text-base font-medium text-[#008243]"
          >
            {role}
          </Typography>
        ))}

        <Button
          className="font-semibold"
          variant="contained"
          startIcon={<Icon icon="mdi:pencil-outline" />}
        >
          Create custom role
        </Button>
      </div>

      <Paper elevation={0} className="p-6 max-w-xl mx-auto">
        <Box className="flex flex-col items-start gap-4">
          <Typography className="text-[18px] font-semibold text-[#0A0A0A]">
            Owner
          </Typography>

          <div className="flex items-center gap-4">
            <Iconify
              fontSize="20px"
              className="MuiIcon-root"
              color="#616161"
              icon="tdesign:user-setting"
            />
            <Typography className="text-base font-medium text-[#616161]">
              Admins with this role: Sandra Ibe, Omotoyosi Bakare +1
            </Typography>
          </div>
        </Box>

        <Box className="flex flex-col items-start gap-4 mt-10">
          <Typography className="text-[18px] font-semibold text-[#0A0A0A]">
            Permissions
          </Typography>

          {permissions.map((item, index) => (
            <div key={item.label} className="w-full">
              <div className="flex items-center justify-between gap-4 w-full">
                <Typography className="text-base font-medium text-[#616161]">
                  {item.label}
                </Typography>
                <Iconify
                  fontSize="20px"
                  className="MuiIcon-root"
                  color={item.allowed ? "#008243" : "#E00000"}
                  icon={
                    item.allowed ? "fluent-mdl2:check-mark" : "iconoir:cancel"
                  }
                />
              </div>
              {index !== permissions.length - 1 && (
                <Divider className="w-full pt-3" />
              )}
            </div>
          ))}
        </Box>

        <Box className="mt-6">
          <Button
            className="font-semibold"
            variant="contained"
            startIcon={<Icon icon="mdi:pencil-outline" />}
          >
            Edit role
          </Button>
        </Box>
      </Paper>
    </div>
  );
};
export const Component = RoleAndPermission;
export default RoleAndPermission;
