import TransactionsTableHeader from "modules/transaction/features/TransactionTableHeader.tsx";
import { Paper } from "@mui/material";
import TransactionTable, {
  columns,
} from "modules/transaction/features/TransactionTable.tsx";
import usePagination from "hooks/use-pagination.ts";
import { orderApi } from "apis/order.ts";
import { useMemo, useState } from "react";
import useTable from "hooks/use-table.ts";
import { Customer } from "types/customer.ts";
import { useSnackbar } from "notistack";
import * as dfns from "date-fns";
import { TransactionFilterState } from "modules/transaction/features/TransactionFilter.tsx";

function CustomerTransactionList(props: CustomerTransactionListProps) {
  const { customer } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [filter, setFilter] = useState(() => ({}) as TransactionFilterState);

  const [pagination, setPagination] = usePagination();

  const [getOrdersQuery] = orderApi.useLazyGetOrdersQuery();

  const ordersQueryResult = orderApi.useGetOrdersQuery(
    useMemo(
      () => ({
        params: {
          CustomerId: customer.id,
          Page: pagination.pageIndex + 1,
          Limit: pagination.pageSize,
          Status: filter.Status || undefined,
          FromDate: filter.FromDate
            ? dfns.format(filter.FromDate, "yyyy-MM-dd")
            : undefined,
          ToDate: filter.ToDate
            ? dfns.format(filter.ToDate, "yyyy-MM-dd")
            : undefined,
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

  async function handleExport() {
    try {
      const data = await getOrdersQuery({
        params: {
          CustomerId: customer.id,
          Status: filter.Status || undefined,
          FromDate: filter.FromDate || undefined,
          ToDate: filter.ToDate || undefined,
          isExport: true,
        },
      }).unwrap();
      enqueueSnackbar(data?.message || "Transactions exported Successful", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error?.message || "Transaction Export Failed", {
        variant: "error",
      });
    }
  }

  return (
    <>
      <div className="space-y-6">
        <TransactionsTableHeader
          total={orders?.page?.total}
          filter={filter}
          onFilterApply={setFilter}
          onExport={handleExport as any}
        />
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
