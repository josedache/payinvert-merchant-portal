import useTable from "hooks/use-table";
import TransactionTable, { columns } from "../features/TransactionTable";
import TransactionsTableHeader from "../features/TransactionTableHeader";
import { useMemo } from "react";
import { Paper } from "@mui/material";
import { orderApi } from "apis/order.ts";
import usePagination from "hooks/use-pagination.ts";

const TransactionList = () => {
  const [pagination, setPagination] = usePagination();

  const ordersQueryResult = orderApi.useGetOrdersQuery(
    useMemo(
      () => ({
        params: {
          Page: pagination.pageIndex + 1,
          Limit: pagination.pageSize,
        },
      }),
      [pagination.pageIndex, pagination.pageSize]
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
  );
};
export const Component = TransactionList;
export default TransactionList;
