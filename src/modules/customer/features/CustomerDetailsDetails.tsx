import { Customer } from "types/customer.ts";
import { Paper, Typography } from "@mui/material";

function CustomerDetailsDetails(props: { customer: Customer }) {
  const { customer } = props;

  return (
    <>
      <Paper className="overflow-hidden">
        <div className="p-4 bg-neutral-200">
          <Typography variant="h6">Customer details</Typography>
        </div>
        <div className="p-4 space-y-8">
          {[
            { label: "Customer name", value: customer?.customerName },
            { label: "Customer email", value: customer?.emailAddress },
            {
              label: "Mobile phone",
              value: customer?.mobileNumber,
            },
            { label: "Country", value: customer.countryName },
          ].map(({ label, value }) => {
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Typography className="font-semibold">{label}</Typography>
                <Typography>{value}</Typography>
              </div>
            );
          })}
        </div>
      </Paper>
    </>
  );
}

export default CustomerDetailsDetails;
