import { MenuItem, TextField, Typography } from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import useTable from "hooks/use-table";

const Payout = () => {
  const tableInstance = useTable({ data, columns });
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography variant="h6">Payouts - 20</Typography>

        <TextField select size="small" label="Export" className="w-24">
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

      <TanStandardTable instance={tableInstance} />
    </div>
  );
};
export const Component = Payout;
export default Payout;

const data = [
  {
    payout_date: "Mar 01, 2023",
    recipient: "John Doe",
    total_amount: "NGN 10,000.00",
    settlement_amount: "NGN 100.00",
  },
  {
    payout_date: "Mar 01, 2023",
    recipient: "John Doe",
    total_amount: "NGN 10,000.00",
    settlement_amount: "NGN 100.00",
  },
  {
    payout_date: "Mar 01, 2023",
    recipient: "John Doe",
    total_amount: "NGN 10,000.00",
    settlement_amount: "NGN 100.00",
  },
];
const columns = [
  {
    header: "Payout date",
    accessorKey: "payout_date",
  },
  {
    header: "Recipient",
    accessorKey: "recipient",
  },
  {
    header: "Total amount",
    accessorKey: "total_amount",
  },
  {
    header: "Settlement amount",
    accessorKey: "settlement_amount",
  },
];
