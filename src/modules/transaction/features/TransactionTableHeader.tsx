import { MenuItem, TextField, Typography } from "@mui/material";

const TransactionsTableHeader = ({ total }: { total: number }) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <Typography className="text-[18px] font-medium">
        Transactions - {total ?? 0}
      </Typography>
      <div className="flex gap-2 items-center">
        <TextField select size="small" label="Filter" className="w-24">
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
    </div>
  );
};
export const Component = TransactionsTableHeader;
export default TransactionsTableHeader;
