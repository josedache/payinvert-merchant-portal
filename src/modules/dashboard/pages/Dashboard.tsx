import { Chip, MenuItem, Paper, TextField, Typography } from "@mui/material";
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

const data = [
  {
    name: "Mar 01",
    outflow: 4000,
    inflow: 2400,
    amt: 2400,
  },
  {
    name: "Mar 02",
    outflow: 3000,
    inflow: 1398,
    amt: 2210,
  },
  {
    name: "Mar 03",
    outflow: 2000,
    inflow: 9800,
    amt: 2290,
  },
  {
    name: "Mar 04",
    outflow: 2780,
    inflow: 3908,
    amt: 2000,
  },
  {
    name: "Mar 05",
    outflow: 1890,
    inflow: 4800,
    amt: 2181,
  },
  {
    name: "Mar 06",
    outflow: 2390,
    inflow: 3800,
    amt: 2500,
  },
  {
    name: "Mar 07",
    outflow: 3490,
    inflow: 4300,
    amt: 2100,
  },
];

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Paper className="p-4 flex gap-2">
        <div className="size-12 shrink-0 grid place-items-center rounded-full text-pink-500 bg-pink-50 mt-2">
          <Icon icon="ph:timer-duotone" width={24} />
        </div>
        <div className="space-y-2">
          <Typography>Transaction Count</Typography>
          <Typography variant="h4" className="font-semibold">
            175
          </Typography>
          <div className="flex items-center gap-2 pt-5">
            <Chip
              icon={<Icon icon="ph:trend-up-fill" width={15} />}
              label="+1%"
              color="success"
            />
            <Typography className="text-gray-500">from last week</Typography>
          </div>
        </div>
      </Paper>
      <Analytics
        icon="material-symbols:speed-outline"
        className="text-purple-500 bg-purple-50"
        label="volume"
        amount="960,000"
        trend="-2"
      />
      <Analytics
        icon="icon-park-twotone:round-caliper"
        className="text-orange-500 bg-orange-50"
        label="settlements"
        amount="140,650"
        trend="+6"
      />
      <AnalyticsWithLink
        icon="si:money-duotone"
        className="text-green-500 bg-green-50"
        label="Available"
        amount="42,650"
        trend="-3"
      />
      <Paper className="col-span-1 p-4 row-span-1 md:col-span-2 lg:row-span-2">
        <div className="flex justify-between gap-5 flex-col md:flex-row">
          <div className="space-y-1">
            <Typography>Transactions</Typography>
            <Typography className="text-gray-500">
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
            <TextField select label="This Week" size="small" className="w-28">
              {[
                {
                  value: "all",
                  label: "This Week",
                },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select label="Export" size="small" className="w-24">
              {[
                {
                  value: "all",
                  label: "Export",
                },
              ].map((option) => (
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
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
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
        amount="122,600"
        trend="+6"
      />
    </div>
  );
}

export default Dashboard;

export const Component = Dashboard;
