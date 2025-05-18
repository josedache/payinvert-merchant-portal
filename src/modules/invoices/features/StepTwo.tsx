import {
  Button,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FormContentProps } from "../pages/AddInvoice";

const StepTwo = ({ formik }: FormContentProps) => {
  return (
    <div className="space-y-6">
      <Paper elevation={0} className="p-5 space-y-4">
        <Typography variant="h6" className="font-semibold">
          Invoice details
        </Typography>

        <TextField
          label="Invoice title"
          placeholder="Enter invoice title"
          className="w-full"
          required
          {...formik.getFieldProps("invoice.title")}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="Due date"
            defaultValue={new Date().toISOString().split("T")[0]}
            type="date"
            className="w-full"
            {...formik.getFieldProps("invoice.dueDate")}
          />
          <TextField
            label="Currency"
            placeholder="Enter currency"
            className="w-full"
            {...formik.getFieldProps("invoice.currency")}
          />
        </div>

        {formik.values.invoice.items.map((_, index: number) => (
          <div key={index} className="space-y-4 pt-4">
            <Typography variant="h6" className="font-semibold">
              Item {index + 1}
            </Typography>
            <TextField
              label="Description"
              multiline
              rows={4}
              placeholder="Enter description"
              className="w-full"
              {...formik.getFieldProps(`invoice.items.${index}.description`)}
            />
            <TextField
              label="Quantity"
              placeholder="Enter quantity"
              className="w-full"
              {...formik.getFieldProps(`invoice.items.${index}.quantity`)}
            />
            <TextField
              label="Unit price"
              placeholder="Enter unit price"
              className="w-full"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">NGN</InputAdornment>
                  ),
                },
              }}
              {...formik.getFieldProps(`invoice.items.${index}.price`)}
            />
          </div>
        ))}
        <Button
          onClick={() => {
            formik.setFieldValue("invoice.items", [
              ...formik.values.invoice.items,
              { description: "", quantity: 1, price: 0 },
            ]);
          }}
          variant="soft"
        >
          Add another item
        </Button>
      </Paper>
      <Paper elevation={0} className="p-5 space-y-4">
        <TextField
          label="Invoice notes"
          placeholder="Enter invoice notes"
          className="w-full"
          required
          {...formik.getFieldProps("invoice.notes")}
        />
        <TextField
          label="Add discount"
          placeholder="Enter discount"
          className="w-full"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">NGN</InputAdornment>
              ),
            },
          }}
          {...formik.getFieldProps("invoice.discount")}
        />
        <TextField
          label="Add tax"
          placeholder="Enter tax"
          className="w-full"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">NGN</InputAdornment>
              ),
            },
          }}
          {...formik.getFieldProps("invoice.tax")}
        />

        <div className="flex justify-between items-center gap-4 pt-5">
          <Typography>Subtotal</Typography>
          <Typography>NGN 25,000</Typography>
        </div>
        <Divider />
        <div className="flex justify-between items-center gap-4">
          <Typography variant="h6" className="font-semibold">
            Total
          </Typography>
          <Typography variant="h6" className="font-semibold">
            NGN 25,000
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default StepTwo;
