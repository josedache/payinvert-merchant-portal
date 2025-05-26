import {
  Button,
  Divider,
  FormControlLabel,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import useTable from "hooks/use-table";
import { Icon } from "@iconify/react";
import usePopover from "hooks/use-popover";
import { useState } from "react";
import * as CustomIcon from "assets/icons";

const PayoutAccount = () => {
  const [selectedBank, setSelectedBank] = useState(null);

  const tableInstance = useTable({
    data,
    columns: columns(selectedBank, setSelectedBank),
  });

  return (
    <>
      <Paper elevation={0} className="p-6 space-y-6 max-w-lg">
        <div className="space-y-1">
          <Typography className="text-[18px] font-semibold text-[#0A0A0A]">
            Accounts
          </Typography>
          <Typography className="text-base font-medium text-[#616161]">
            Which account would you like to get your earnings?
          </Typography>
        </div>

        <div className="flex flex-col items-start">
          <RadioGroup
            name="limitType"
            defaultValue="bank"
            className="flex flex-col items-start w-full"
          >
            <FormControlLabel
              value="bank"
              control={<Radio />}
              label="Settle to bank"
              labelPlacement="end"
            />
            <Divider className="w-full my-1" />
            <FormControlLabel
              value="payinvert"
              control={<Radio />}
              label="Settle to Payinvert account"
              labelPlacement="end"
            />
          </RadioGroup>
        </div>
      </Paper>

      <div className="space-y-6 mt-10">
        <div className="flex justify-between items-center gap-4">
          <Typography className="text-[18px] font-medium">
            Bank account
          </Typography>
          <div className="flex gap-2 items-center">
            <Button startIcon={<CustomIcon.Bank />}>Add a bank account</Button>
          </div>
        </div>

        <TanStandardTable pagination={false} instance={tableInstance} />
      </div>
    </>
  );
};
export const Component = PayoutAccount;
export default PayoutAccount;

const data = [
  {
    bankName: "Guaranty Trust Bank PLC",
    accountNumber: "0456710045",
    accountName: "Tosin Kolapo",
    currency: "NGN",
  },
  {
    bankName: "Zenith Bank PLC",
    accountNumber: "1129600453",
    accountName: "Yorubasiti",
    currency: "NGN",
  },
  {
    bankName: "First Bank",
    accountNumber: "2932150042",
    accountName: "Anabel Obi",
    currency: "NGN",
  },
];

const columns = (selectedBank, setSelectedBank) => [
  {
    header: "Bank name",
    accessorKey: "bankName",
    cell: ({ row }) => {
      const isSelected = selectedBank === row.original.accountNumber;
      return (
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="bank"
            checked={isSelected}
            onChange={() => setSelectedBank(row.original.accountNumber)}
            className="accent-green-600"
          />
          <span>{row.original.bankName}</span>
        </div>
      );
    },
  },
  {
    header: "Account number",
    accessorKey: "accountNumber",
  },
  {
    header: "Account name",
    accessorKey: "accountName",
  },
  {
    header: "Currency",
    accessorKey: "currency",
  },
  {
    header: "Actions",
    id: "actions",
    size: 80,
    cell: () => <Action />,
  },
];

const Action = () => {
  const popover = usePopover();
  return (
    <div>
      <Button
        variant="text"
        size="small"
        startIcon={<Icon icon="uil:ellipsis-v" />}
        className="text-black"
        onClick={popover.togglePopover}
      />
      <Popover
        open={popover.isOpen}
        anchorEl={popover.anchorEl}
        onClose={popover.togglePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{ paper: { className: "w-48 bg-gray-50", elevation: 2 } }}
      >
        <div className="p-2 space-y-2 w-full"></div>
      </Popover>
    </div>
  );
};
