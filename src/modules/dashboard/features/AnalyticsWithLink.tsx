import { Button, Chip, Paper, Typography } from "@mui/material";
import { cn } from "utils/cn";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { BALANCE } from "constants/urls";
import { ReactNode } from "react";
import * as CustomIcon from "assets/icons";

type TProps = {
  icon: ReactNode;
  className: string;
  label: string;
  amount: string;
  trend: string;
};

const AnalyticsWithLink = ({
  icon,
  className,
  label,
  amount,
  trend,
}: TProps) => {
  return (
    <Paper className="space-y-5 flex flex-col justify-between overflow-hidden">
      <div className="p-4 flex gap-2">
        <div
          className={cn(
            "size-12 shrink-0 grid place-items-center rounded-full mt-2",
            className
          )}
        >
          {icon}
        </div>
        <div className="space-y-2">
          <Typography className="font-semibold flex items-center gap-2">
            {label} balance{" "}
            <span>
              <CustomIcon.Caution />
            </span>
          </Typography>
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
      </div>
      <div className="flex justify-end p-1 bg-green-50">
        <Link to={BALANCE}>
          <Button variant="text" endIcon={<Icon icon="uil:arrow-right" />}>
            View balance
          </Button>
        </Link>
      </div>
    </Paper>
  );
};

export default AnalyticsWithLink;
