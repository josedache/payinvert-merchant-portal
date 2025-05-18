import PaymentLinkDetailsTable from "../features/PaymentLinkDetailsTable";
import PaymentLinkDetailsProductTable from "../features/PaymentLinkProductList";
import Transaction from "modules/transaction/pages/Transaction";

const PaymentLinkDetails = () => {
  return (
    <div className="space-y-8">
      <PaymentLinkDetailsTable />

      <PaymentLinkDetailsProductTable />

      <Transaction />
    </div>
  );
};
export const Component = PaymentLinkDetails;
export default PaymentLinkDetails;
