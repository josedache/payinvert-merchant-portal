import useTable from "hooks/use-table";
import TransactionTable, { columns } from "../features/TransactionTable";
import TransactionsTableHeader from "../features/TransactionTableHeader";
import { useMemo, useState } from "react";
import { Paper } from "@mui/material";
import { orderApi } from "apis/order.ts";
import usePagination from "hooks/use-pagination.ts";
import { TransactionFilterState } from "modules/transaction/features/TransactionFilter.tsx";
import { useSnackbar } from "notistack";
import * as dfns from "date-fns";

const TransactionList = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [filter, setFilter] = useState(() => ({}) as TransactionFilterState);

  const [pagination, setPagination] = usePagination();

  const [getOrdersQuery] = orderApi.useLazyGetOrdersQuery();

  const ordersQueryResult = orderApi.useGetOrdersQuery(
    useMemo(
      () => ({
        params: {
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
      [pagination.pageIndex, pagination.pageSize, filter]
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
  );
};
export const Component = TransactionList;
export default TransactionList;
