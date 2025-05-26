import PaymentLinkDetailsTable from "../features/PaymentLinkDetailsTable";
// import PaymentLinkDetailsProductTable from "../features/PaymentLinkProductList";
import { paymentLinkApi } from "apis/payment-link.ts";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import LoadingContent from "components/LoadingContent.tsx";
import PaymentLinkTransactionList from "modules/payment-link/features/PaymentLinkTransactionList.tsx";

const PaymentLinkDetails = () => {
  const { id } = useParams();

  const paymentLinkQueryResult = paymentLinkApi.useGetPaymentLinksQuery(
    useMemo(() => ({ params: { Id: id! } }), [id]),
    { skip: !id }
  );

  const paymentLink = paymentLinkQueryResult.data?.items?.[0];

  return (
    <LoadingContent
      loading={paymentLinkQueryResult.isLoading}
      error={paymentLinkQueryResult.isError}
      onRetry={paymentLinkQueryResult.refetch}
    >
      {() => (
        <>
          <div className="space-y-8">
            <PaymentLinkDetailsTable paymentLink={paymentLink} />
            {/*<PaymentLinkDetailsProductTable />*/}
            <PaymentLinkTransactionList paymentLink={paymentLink} />
          </div>
        </>
      )}
    </LoadingContent>
  );
};
export const Component = PaymentLinkDetails;
export default PaymentLinkDetails;
