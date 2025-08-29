import { Chip, ChipProps } from "@mui/material";
import { Wallet } from "types/wallet";

export type TransactionDirectionChipProps = ChipProps & {
  transaction: Wallet;
};

export default function TransactionDirectionChip(
  props: TransactionDirectionChipProps
) {
  const { transaction } = props;

  if (!transaction) {
    return null;
  }
  const label = getTransactionDirectionLabel(transaction);
  const color = getTransactionDirectionColor(transaction);

  return <Chip label={label} color={color as any} {...props} />;
}

const getTransactionDirectionLabel = (transaction: Wallet) => {
  // if (transaction.debit) {
  //   return "Debit";
  // } else if (transaction.credit) {
  //   return "Credit";
  // } else if (transaction.amountOnHold) {
  //   return "Processing";
  // } else if (
  //   transaction.reversed ||
  //   transaction.isReversal ||
  //   transaction.reversalTransaction
  // ) {
  //   return "Reversed";
  // }
  // return "";

  return transaction?.transactionType;
};

const getTransactionDirectionColor = (transaction: Wallet) => {
  if (transaction.transactionType?.toLowerCase() === "credit") {
    return "success";
  }
  if (transaction.transactionType?.toLowerCase() === "debit") {
    return "error";
  }

  return "default";
  // if (transaction.debit) {
  //   return "error";
  // } else if (transaction.credit) {
  //   return "success";
  // } else if (transaction.amountOnHold) {
  //   return "warning";
  // } else if (
  //   transaction.reversed ||
  //   transaction.isReversal ||
  //   transaction.reversalTransaction
  // ) {
  //   return "info";
  // }
  // return "default";
};
