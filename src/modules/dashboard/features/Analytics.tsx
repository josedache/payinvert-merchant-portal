import { Chip, Paper, Typography } from "@mui/material";
import { cn } from "utils/cn";
import { Icon } from "@iconify/react";

type TProps = {
  icon: string;
  className: string;
  label: string;
  amount: string;
  trend: string;
};

const Analytics = ({ icon, className, label, amount, trend }: TProps) => {
  return (
    <Paper className="p-4 flex gap-2">
      <div
        className={cn(
          "size-12 shrink-0 grid place-items-center rounded-full mt-2",
          className
        )}
      >
        <Icon icon={icon} width={24} />
      </div>
      <div className="space-y-2">
        <Typography>Transaction {label}</Typography>
        <Typography variant="h4" className="font-semibold flex items-center">
          <span className="text-base font-medium pr-1">NGN</span> {amount}{" "}
          <span className="text-base font-medium pt-2">.00</span>
        </Typography>
        <div className="flex items-center gap-2 pt-5">
          <Chip
            icon={
              <Icon
                icon={
                  trend.startsWith("+")
                    ? "ph:trend-up-fill"
                    : "ph:trend-down-fill"
                }
                width={15}
              />
            }
            label={`${trend}%`}
            color={trend.startsWith("+") ? "success" : "error"}
          />
          <Typography className="text-gray-500">from last week</Typography>
        </div>
      </div>
    </Paper>
  );
};

export default Analytics;
