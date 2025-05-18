import PaymentLinksDetailsTable from "../features/PaymentLinksDetailsTable";
import PaymentLinksDetailsProductTable from "../features/PaymentLinksDetailsProductTable";
import TransactionsTable from "modules/transactions/features/TransactionsTable";

const PaymentLinksDetails = () => {
  return (
    <div className="space-y-8">
      <PaymentLinksDetailsTable />

      <PaymentLinksDetailsProductTable />
      
      <TransactionsTable />
    </div>
  );
};
export const Component = PaymentLinksDetails;
export default PaymentLinksDetails;
