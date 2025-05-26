import { useParams } from "react-router-dom";
import { customerApi } from "apis/customer.ts";
import { useMemo } from "react";
import CustomerTransactionList from "modules/customer/features/CustomerTransactionList.tsx";
import LoadingContent from "components/LoadingContent.tsx";
import CustomerDetailsDetails from "modules/customer/features/CustomerDetailsDetails.tsx";

function CustomerDetails() {
  const { id } = useParams();

  const customerQueryResult = customerApi.useGetCustomersQuery(
    useMemo(() => ({ params: { id: id } }), [id]),
    { skip: !id }
  );

  const customer = customerQueryResult.data?.data?.items?.[0];

  return (
    <>
      <LoadingContent
        loading={customerQueryResult.isLoading}
        error={customerQueryResult.isError}
        onRetry={customerQueryResult.refetch}
      >
        {() => (
          <>
            <div className="space-y-4">
              <CustomerDetailsDetails customer={customer} />
              <CustomerTransactionList customer={customer} />
            </div>
          </>
        )}
      </LoadingContent>
    </>
  );
}

export const Component = CustomerDetails;
export default CustomerDetails;
