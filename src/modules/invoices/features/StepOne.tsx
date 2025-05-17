import { Paper, TextField, Typography } from "@mui/material";
import { FormContentProps } from "../pages/AddInvoice";

const StepOne = ({ formik }: FormContentProps) => {
  return (
    <div className="space-y-6">
      <Paper elevation={0} className="p-5 space-y-4">
        <Typography variant="h6" className="font-semibold">
          Business details
        </Typography>

        <TextField
          label="Company name"
          placeholder="Enter company name"
          className="w-full"
          {...formik.getFieldProps("business.name")}
        />
        <TextField
          label="Company email"
          placeholder="Enter company email"
          className="w-full"
          {...formik.getFieldProps("business.email")}
        />
      </Paper>
      <Paper elevation={0} className="p-5 space-y-4">
        <Typography variant="h6" className="font-semibold">
          Business Logo
        </Typography>
      </Paper>
      <Paper elevation={0} className="p-5 space-y-4">
        <Typography variant="h6" className="font-semibold">
          Customer details
        </Typography>

        <TextField
          label="Customer name"
          placeholder="Enter customer name"
          className="w-full"
          {...formik.getFieldProps("business.name")}
        />
        <TextField
          label="Customer email"
          placeholder="Enter customer email"
          className="w-full"
          {...formik.getFieldProps("business.email")}
        />
      </Paper>
    </div>
  );
};

export default StepOne;
