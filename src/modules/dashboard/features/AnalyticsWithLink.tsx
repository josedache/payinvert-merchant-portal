import { Button, Paper, Typography } from "@mui/material";
import { cn } from "utils/cn";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { BALANCE } from "constants/urls";
import AnalyticsChip from "components/AnalyticsChip";
import currency from "currency.js";

type TProps = {
  icon: string;
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
          <Icon icon={icon} width={24} />
        </div>
        <div className="space-y-2">
          <Typography>{label} balance</Typography>
          <Typography variant="h4" className="font-semibold flex items-center">
            <Typography className="font-medium pr-1">NGN</Typography>{" "}
            {currency(amount, { symbol: "" }).format()?.split(".")?.[0] || "0"}
            <Typography
              component="span"
              variant="body1"
              className="font-medium pt-2"
            >
              .
              {currency(amount, { symbol: "" }).format()?.split(".")?.[1] ||
                "00"}
            </Typography>
          </Typography>
          <div className="flex items-center gap-2 pt-5">
            <AnalyticsChip label={trend} />
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
