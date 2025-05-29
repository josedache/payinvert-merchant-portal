import { BALANCE_HISTORY } from "constants/urls";
import { Button, Paper, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { subsidiaryApi } from "apis/subsidiary";
import currency from "currency.js";
import AnalyticsChip from "components/AnalyticsChip";

const Balance = () => {
  const getDashboardChartQuery =
    subsidiaryApi.useGetSubsidiaryDashboardChartQuery({
      params: { ChartFilter: "Week" },
    });

  const amount = getDashboardChartQuery?.data?.availableBalance?.data || 0.0;
  const trend =
    getDashboardChartQuery?.data?.availableBalance?.percentage || "0";

  const getComplianceInfoQuery =
    subsidiaryApi.useGetSubsidiaryComplianceInfoQuery();
  const complianceInfo = getComplianceInfoQuery?.data;
  return (
    <div className="space-y-8">
      <div className="flex justify-end gap-2 items-center">
        <Button
          disabled
          startIcon={<Icon icon="solar:wallet-money-bold-duotone" />}
        >
          Top up
        </Button>
        <Button
          component={Link}
          to={BALANCE_HISTORY}
          variant="soft"
          startIcon={<Icon icon="fluent:document-search-20-filled" />}
        >
          View balance history
        </Button>
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
              <Typography className="font-medium pr-1">NGN</Typography>{" "}
              {currency(amount, { symbol: "" }).format()?.split(".")?.[0] ||
                "0"}
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
              <AnalyticsChip label={String(trend)} />
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
            <Typography>
              {complianceInfo?.bankCompliance?.bankName || "N/A"}
            </Typography>
            <Typography
              variant="h4"
              className="font-semibold flex items-center"
            >
              {complianceInfo?.bankCompliance?.accountNumber || "N/A"}
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
