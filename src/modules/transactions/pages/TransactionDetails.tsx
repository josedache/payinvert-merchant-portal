import { Typography } from "@mui/material";

const TransactionDetails = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography className="text-[18px] font-medium">
          Transaction details
        </Typography>
      </div>

      <div className="space-y-8">
        <TransactionSection
          title="Order details"
          data={transactionDetailsData.orderDetails}
        />
        <TransactionSection
          title="Customer details"
          data={transactionDetailsData.customerDetails}
        />
        <TransactionSection
          title="Payment details"
          data={transactionDetailsData.paymentDetails}
        />
      </div>
    </div>
  );
};
export const Component = TransactionDetails;
export default TransactionDetails;

const TransactionSection = ({
  title,
  data,
}: {
  title: string;
  data: Record<string, string>;
}) => (
  <div className="rounded-bl-[8px] rounded-br-[8px] rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_1px_2px_0px_#0000001F] z-10">
    <div className="bg-[#EDEDED] rounded-tl-[8px] rounded-tr-[8px] py-2.5 px-5">
      <Typography className="text-xl font-semibold">{title}</Typography>
    </div>
    <div className="">
      {Object.entries(data).map(([label, value], index) => (
        <div
          key={index}
          className="py-3.5 px-5 flex items-center justify-between gap-2"
        >
          <Typography className="flex-2 text-[16px] font-semibold">
            {label}
          </Typography>
          <Typography className="flex-3 text-[15px] font-medium">
            {value}
          </Typography>
        </div>
      ))}
    </div>
  </div>
);

const transactionDetailsData = {
  orderDetails: {
    "Order reference": "7jlu9x8cxjl",
    "Payment reference": "PARORD-D7A30881-9846-4273-933B-B1C3EF016307",
    "Payment response code": "02",
    "Payment response message": "N/A",
  },
  customerDetails: {
    "Customer name": "Gani Fawehinmi",
    "Customer email": "gani@email.com",
    "Customer phone number": "08091982819",
    Country: "Nigeria",
  },
  paymentDetails: {
    "Payment method": "Bank account",
    Currency: "NGN",
    Amount: "NGN 25,000",
    Status: "Initiated",
    Narration: "The leather bag",
    Remarks: "Order initiated and created successfully",
    Fee: "NGN 320.00",
    "Subsidiary fee": "NGN 0.00",
    "Customer fee": "NGN 0.00",
    "Who bears fee?": "–",
    "Date created": "19 Jan 2022  5:00pm",
    "Date updated": "N/A",
    "Date payment confirmed": "N/A",
  },
};
