import { useParams } from "react-router-dom";
import { customerApi } from "apis/customer";
import { useMemo } from "react";
import CustomerTransactionList from "modules/customer/features/CustomerTransactionList";
import LoadingContent from "components/LoadingContent";
import CustomerDetailsDetails from "modules/customer/features/CustomerDetailsDetails";
import PageTitle from "components/PageTitle";
import { CUSTOMER } from "constants/urls";

function CustomerDetails() {
  const { id } = useParams();

  const customerQueryResult = customerApi.useGetCustomersQuery(
    useMemo(() => ({ params: { id: id } }), [id]),
    { skip: !id }
  );

  const customer = customerQueryResult.data?.data?.items?.[0];

  return (
    <>
      <PageTitle
        breadcrumbs={[
          { label: "Customers", to: CUSTOMER },
          { label: "Customer information" },
        ]}
      >
        Customers <span className="mx-2 text-text-secondary">&gt;</span>{" "}
        Customer
      </PageTitle>
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
