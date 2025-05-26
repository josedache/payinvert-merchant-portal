import { MenuItem, Paper, TextField, Typography } from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import useTable from "hooks/use-table";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "types/customer.ts";
import CustomerStatus from "modules/customer/features/CustomerStatus.tsx";
import { customerApi } from "apis/customer.ts";
import CustomerTableAction from "modules/customer/features/CustomerTableAction.tsx";
import usePagination from "hooks/use-pagination.ts";

const CustomerList = () => {
  const [pagination, setPagination] = usePagination();

  const customerQueryResult = customerApi.useGetCustomersQuery(
    useMemo(
      () => ({
        params: { Page: pagination.pageIndex + 1, Limit: pagination.pageSize },
      }),
      [pagination.pageIndex, pagination.pageSize]
    )
  );

  const customers = customerQueryResult.data?.data;

  const tableInstance = useTable({
    data: customers?.items,
    columns,
    manualPagination: true,
    pageCount: customers?.page?.totalPage ?? 1,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <Typography className="text-[18px] font-medium">
          Customers - {customers?.page?.total ?? 0}
        </Typography>
        <div className="flex gap-2 items-center">
          <TextField select size="small" label="Filter" className="w-24">
            {[
              {
                value: "all",
                label: "Export",
              },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField select size="small" label="Export" className="w-24">
            {[
              {
                value: "all",
                label: "Export",
              },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {/*<Button startIcon={<Icon icon="mdi:user-add" />}>*/}
          {/*  Add new customer*/}
          {/*</Button>*/}
        </div>
      </div>

      <Paper>
        <TanStandardTable
          instance={tableInstance}
          loading={customerQueryResult.isLoading}
          error={customerQueryResult.isError}
          onEmptyRetry={customerQueryResult.refetch}
          onErrorRetry={customerQueryResult.refetch}
        />
      </Paper>
    </div>
  );
};
export const Component = CustomerList;
export default CustomerList;

const columns: ColumnDef<Customer, any>[] = [
  {
    header: "Name",
    accessorKey: "customerName",
  },
  {
    header: "Email",
    accessorKey: "emailAddress",
  },
  {
    header: "Mobile number",
    accessorKey: "mobileNumber",
  },
  {
    header: "Country",
    accessorKey: "countryName",
  },
  // {
  //   header: "Date Created",
  //   accessorKey: "dateCreated",
  //   cell: ({ getValue }) =>
  //     getValue() ? (
  //       <Typography>
  //         {dfns.format(getValue(), "dd-MMM-yyyy hh:mm:ss aaa")}
  //       </Typography>
  //     ) : (
  //       <Typography>--</Typography>
  //     ),
  // },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <CustomerStatus customer={row.original} />,
  },
  {
    header: "Actions",
    id: "actions",
    size: 80,
    cell: ({ row }) => <CustomerTableAction customer={row.original} />,
  },
];
