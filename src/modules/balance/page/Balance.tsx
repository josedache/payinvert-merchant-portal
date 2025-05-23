import { BALANCE_HISTORY } from "constants/urls";
import { Button, Chip, Paper, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Balance = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-end gap-2 items-center">
        <Button startIcon={<Icon icon="solar:wallet-money-bold-duotone" />}>
          Top up
        </Button>
        <Link to={BALANCE_HISTORY}>
          <Button
            variant="soft"
            startIcon={<Icon icon="fluent:document-search-20-filled" />}
          >
            View balance history
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Paper className="space-y-5 p-4 flex gap-2">
          <div className="size-12 shrink-0 grid place-items-center rounded-full mt-2 text-green-500 bg-green-50">
            <Icon icon="si:money-duotone" width={24} />
          </div>
          <div className="space-y-2">
            <Typography>Available balance</Typography>
            <Typography
              variant="h4"
              className="font-semibold flex items-center"
            >
              <span className="text-base font-medium pr-1">NGN</span> 42,650{" "}
              <span className="text-base font-medium pt-2">.00</span>
            </Typography>
            <div className="flex items-center gap-2 pt-5">
              <Chip
                icon={
                  <Icon
                    icon={
                      "+6".startsWith("+")
                        ? "ph:trend-up-fill"
                        : "ph:trend-down-fill"
                    }
                    width={15}
                  />
                }
                label={`${"+6"}%`}
                color={"+6".startsWith("+") ? "success" : "error"}
              />
              <Typography className="text-gray-500">from last week</Typography>
            </div>
          </div>
        </Paper>
        <Paper className="space-y-5 p-4 flex gap-2">
          <div className="size-12 shrink-0 grid place-items-center rounded-full mt-2 text-red-500 bg-red-50">
            <Icon icon="si:money-duotone" width={24} />
          </div>
          <div className="space-y-2">
            <Typography>Blocked funds</Typography>
            <Typography
              variant="h4"
              className="font-semibold flex items-center"
            >
              <span className="text-base font-medium pr-1">NGN</span> 0{" "}
              <span className="text-base font-medium pt-2">.00</span>
            </Typography>
          </div>
        </Paper>
        <Paper className="space-y-5 p-4 flex gap-2">
          <div className="size-12 shrink-0 grid place-items-center rounded-full mt-2 text-blue-500 bg-blue-50">
            <Icon icon="basil:bank-outline" width={24} />
          </div>
          <div className="space-y-2">
            <Typography>Guaranty Trust Bank</Typography>
            <Typography
              variant="h4"
              className="font-semibold flex items-center"
            >
              2201945601
            </Typography>
            <Typography>
              This account is linked to your Payinvert balance
            </Typography>
          </div>
        </Paper>
      </div>
    </div>
  );
};
export const Component = Balance;
export default Balance;
