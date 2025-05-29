import { MenuItem, Paper, TextField, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Analytics from "../features/Analytics";
import AnalyticsWithLink from "../features/AnalyticsWithLink";
import { subsidiaryApi } from "apis/subsidiary";
import AnalyticsChip from "components/AnalyticsChip";
import { useState } from "react";
import { format } from "date-fns";
import { Settlements } from "assets/icons";

const chartFilterOptions = [
  {
    value: "Week",
    label: "This Week",
  },
  {
    value: "Month",
    label: "This Month",
  },
  {
    value: "Year",
    label: "This Year",
  },
];

function Dashboard() {
  const [chartFilter, setChartFilter] = useState("Week");
  const getDashboardChartQuery =
    subsidiaryApi.useGetSubsidiaryDashboardChartQuery({
      params: { ChartFilter: chartFilter as any },
    });
  const chartData = getDashboardChartQuery?.data?.chartData || [];
  const data = Object.keys(chartData).map((key) => ({
    name: key,
    inflow: chartData[key].CREDIT || 0,
    outflow: chartData[key].DEBIT || 0,
    amt: chartData[key].DEBIT + chartData[key].CREDIT || 0,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <Paper className="p-4 flex gap-2">
        <div className="size-12 shrink-0 grid place-items-center rounded-full text-pink-500 bg-pink-50 mt-2">
          <Icon icon="ph:timer-duotone" width={24} />
        </div>
        <div className="space-y-2">
          <Typography className="font-medium">Transaction Count</Typography>
          <Typography variant="h4" className="font-semibold">
            {getDashboardChartQuery?.data?.transactionCount?.data || "0"}
          </Typography>
          <div className="flex items-center gap-2 pt-5">
            <AnalyticsChip
              label={String(
                getDashboardChartQuery?.data?.transactionCount?.percentage || 0
              )}
            />
            <Typography className="text-gray-500">from last week</Typography>
          </div>
        </div>
      </Paper>
      {[
        {
          Component: Analytics,
          icon: "material-symbols:speed-outline",
          className: "text-purple-500 bg-purple-50",
          label: "volume",
          dataKey: "transactionVolume",
        },
        {
          Component: Analytics,
          icon: <Settlements />,
          className: "text-orange-500 bg-orange-50",
          label: "settlements",
          dataKey: "transactionSettlement",
        },
        {
          Component: AnalyticsWithLink,
          icon: "si:money-duotone",
          className: "text-green-500 bg-green-50",
          label: "Available",
          dataKey: "availableBalance",
        },
      ].map(({ Component, icon, className, label, dataKey }) => (
        <Component
          key={dataKey}
          icon={icon}
          className={className}
          label={label}
          amount={String(getDashboardChartQuery?.data?.[dataKey]?.data || "0")}
          trend={String(
            getDashboardChartQuery?.data?.[dataKey]?.percentage || 0
          )}
        />
      ))}
      <Paper className="col-span-1 p-4 row-span-1 md:col-span-2 lg:row-span-2">
        <div className="flex justify-between gap-5 flex-col md:flex-row">
          <div className="space-y-1">
            <Typography className="font-medium">Transactions</Typography>
            <Typography variant="body2" className="text-gray-500">
              Track inflow and outflow of money over time
            </Typography>

            <div className="pt-4 flex gap-4">
              <div className="flex items-center gap-1">
                <div className="h-2 w-6 bg-blue-500" />
                <Typography variant="body2">Total inflow</Typography>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-6 bg-orange-500" />
                <Typography variant="body2">Total outflow</Typography>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <TextField
              value={chartFilter}
              onChange={(e) => setChartFilter(e.target.value)}
              select
              disabled={getDashboardChartQuery.isFetching}
              size="small"
              className="w-28"
            >
              {chartFilterOptions?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        <ResponsiveContainer
          width="100%"
          height={350}
          className="text-gray-500 pt-6"
        >
          <LineChart
            data={data}
            margin={{
              left: -20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickFormatter={(unixTime) =>
                format(
                  unixTime,
                  chartFilter === "Week"
                    ? "EEE"
                    : chartFilter === "Month"
                      ? "MMM d"
                      : "MMM"
                )
              }
            />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="inflow"
              stroke="#0C73B8"
              strokeDasharray="3 2"
            />
            <Line
              type="monotone"
              dataKey="outflow"
              stroke="#FF7E35"
              strokeDasharray="3 2"
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
      <AnalyticsWithLink
        icon="solar:wallet-money-bold-duotone"
        className="text-blue-500 bg-blue-50"
        label="Ledger"
        amount={String(
          getDashboardChartQuery?.data?.ledgerBalance?.data || "0"
        )}
        trend={String(
          getDashboardChartQuery?.data?.ledgerBalance?.percentage || 0
        )}
      />
    </div>
  );
}

export default Dashboard;

export const Component = Dashboard;
