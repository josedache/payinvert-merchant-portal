import { Chip, Paper, TextField, Typography } from "@mui/material";

const InvoiceDetail = () => {
  return (
    <div className="max-w-xl mx-auto space-y-8">
      <Typography variant="h6" className="font-semibold">
        Invoice details
      </Typography>

      <Paper elevation={0} className="p-5 space-y-4">
        <div className="flex justify-between items-center gap-5">
          <Typography variant="h6" className="font-semibold">
            Invoice number: CW8392903
          </Typography>
          <Chip color="success" label="Paid" />
        </div>
        <TextField
          label="Customer name"
          value="Chinedu Ejike"
          className="w-full"
        />
        <TextField
          label="Customer email"
          value="chinedu.ejike@example.com"
          className="w-full"
        />
        <TextField label="Amount" value="NGN 10,000.00" className="w-full" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="Date issued"
            value="Mar 01, 2023"
            className="w-full"
          />
          <TextField label="Due date" value="Mar 01, 2023" className="w-full" />
        </div>
        <TextField
          label="Invoice notes"
          value="Thanks for doing business with us!"
          className="w-full"
        />
      </Paper>
    </div>
  );
};
export const Component = InvoiceDetail;
export default InvoiceDetail;
