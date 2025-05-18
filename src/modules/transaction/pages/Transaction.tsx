import useTable from "hooks/use-table";
import TransactionTable, {
  transactionColumns,
  transactionData,
} from "../features/TransactionTable";
import TransactionsTableHeader from "../features/TransactionTableHeader";

const Transaction = () => {
  const tableInstance = useTable({
    data: transactionData,
    columns: transactionColumns,
  });

  return (
    <div className="space-y-6">
      <TransactionsTableHeader />

      <TransactionTable instance={tableInstance} />
    </div>
  );
};
export const Component = Transaction;
export default Transaction;
