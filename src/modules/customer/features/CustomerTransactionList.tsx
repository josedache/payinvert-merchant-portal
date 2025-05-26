import TransactionsTableHeader from "modules/transaction/features/TransactionTableHeader.tsx";
import { Paper } from "@mui/material";
import TransactionTable, {
  columns,
} from "modules/transaction/features/TransactionTable.tsx";
import usePagination from "hooks/use-pagination.ts";
import { orderApi } from "apis/order.ts";
import { useMemo } from "react";
import useTable from "hooks/use-table.ts";
import { Customer } from "types/customer.ts";

function CustomerTransactionList(props: CustomerTransactionListProps) {
  const { customer } = props;

  const [pagination, setPagination] = usePagination();

  const ordersQueryResult = orderApi.useGetOrdersQuery(
    useMemo(
      () => ({
        params: {
          Page: pagination.pageIndex + 1,
          Limit: pagination.pageSize,
          CustomerId: customer.id,
        },
      }),
      [pagination.pageIndex, pagination.pageSize, customer.id]
    )
  );

  const orders = ordersQueryResult.data?.data;

  const tableInstance = useTable({
    data: orders?.items,
    columns,
    manualPagination: true,
    pageCount: orders?.page?.totalPage ?? 1,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <>
      <div className="space-y-6">
        <TransactionsTableHeader total={orders?.page?.total} />
        <Paper>
          <TransactionTable
            instance={tableInstance}
            loading={ordersQueryResult.isFetching}
            error={ordersQueryResult.isError}
            onEmptyRetry={ordersQueryResult.refetch}
            onErrorRetry={ordersQueryResult.refetch}
          />
        </Paper>
      </div>
    </>
  );
}

export default CustomerTransactionList;

export type CustomerTransactionListProps = {
  customer: Customer;
};
