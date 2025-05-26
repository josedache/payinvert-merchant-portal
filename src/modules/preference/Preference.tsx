import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const Preference = () => {
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Paper className="p-5 space-y-5">
        <div className="">
          <Typography variant="h6">Transactions</Typography>
          <Typography>Who should be charged transaction fees</Typography>
        </div>
        <FormControl className="w-full">
          <RadioGroup
            className="space-y-2"
            aria-labelledby="demo-transaction-buttons-group"
            name="transaction-buttons-group"
            // value={value}
            // onChange={handleChange}
          >
            <FormControlLabel
              value="merchant"
              control={<Radio />}
              label="Charge me the transaction fees"
            />
            <Divider />
            <FormControlLabel
              value="customer"
              control={<Radio />}
              label="Charge my customers the transaction fees"
            />
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper className="p-5 space-y-5">
        <div className="">
          <Typography variant="h6">Payment methods</Typography>
          <Typography>Payment methods available to customers</Typography>
        </div>
        <FormControl className="w-full">
          <FormGroup className="space-y-2">
            {PaymentMethods.map((method, index) => (
              <>
                <FormControlLabel
                  key={method.value}
                  control={<Checkbox />}
                  label={method.label}
                />
                {index < PaymentMethods.length - 1 && <Divider />}
              </>
            ))}
          </FormGroup>
        </FormControl>
      </Paper>
      <Paper className="p-5 space-y-5">
        <Typography variant="h6">Other preferences</Typography>

        <FormControl className="w-full">
          <FormGroup className="space-y-2">
            <FormControlLabel
              control={<Checkbox />}
              label="Enable Two Factor Authentication for login"
            />
          </FormGroup>
        </FormControl>
      </Paper>
    </div>
  );
};
export const Component = Preference;
export default Preference;

const PaymentMethods = [
  { label: "Enable card payment", value: "card" },
  { label: "Enable bank payment", value: "bank" },
  { label: "Enable USSD", value: "ussd" },
  { label: "Enable bank transfer", value: "transfer" },
];
