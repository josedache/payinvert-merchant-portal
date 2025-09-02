import {
  Button,
  Icon,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import TanStandardTable from "components/TanStandardTable";
import { ColumnDef } from "@tanstack/react-table";
import usePagination from "hooks/use-pagination";
// import { collectionAccountApi } from "apis/collection-account";
// import { useMemo } from "react";
import useTable from "hooks/use-table";
import { Icon as Iconify } from "@iconify/react";
import CollectionAccountCreateEdit from "modules/collection-account/features/CollectionAccountCreateEdit";
import * as dfns from "date-fns";
import PageTitle from "components/PageTitle";
import UserStatus from "modules/user/features/UserStatus";
import UserTableAction from "modules/user/features/UserTableAction";
import { CollectionAccount } from "types/collection-account";

function UserList() {
  const [pagination, setPagination] = usePagination();

  // const collectionAccountsQueryResult =
  //   collectionAccountApi.useGetCollectionAccountsBusinessQuery(
  //     useMemo(
  //       () => ({
  //         params: {
  //           Page: pagination.pageIndex + 1,
  //           Limit: pagination.pageSize,
  //         },
  //       }),
  //       [pagination.pageIndex, pagination.pageSize]
  //     )
  //   );
  //
  // const collectionAccounts = collectionAccountsQueryResult.data;

  const tableInstance = useTable({
    // data: collectionAccounts?.items,
    columns,
    // manualPagination: true,
    // pageCount: collectionAccounts?.page?.totalPage ?? 1,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <>
      <PageTitle breadcrumbs={[{ label: "Users" }]}>Users</PageTitle>
      <div className="space-y-6">
        <div className="flex justify-between items-center gap-4">
          <Typography className="text-[18px] font-medium">
            {/*Users - {collectionAccounts?.page?.total ?? 0}*/}
            Users - (0)
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
            <CollectionAccountCreateEdit>
              {({ toggleOpen }) => (
                <Button
                  onClick={toggleOpen}
                  startIcon={
                    <Icon>
                      <Iconify icon="mdi:user-add" />
                    </Icon>
                  }
                >
                  Add new user
                </Button>
              )}
            </CollectionAccountCreateEdit>
          </div>
        </div>

        <Paper>
          <TanStandardTable
            instance={tableInstance}
            // loading={collectionAccountsQueryResult.isLoading}
            // error={collectionAccountsQueryResult.isError}
            // onEmptyRetry={collectionAccountsQueryResult.refetch}
            // onErrorRetry={collectionAccountsQueryResult.refetch}
          />
        </Paper>
      </div>
    </>
  );
}

export const Component = UserList;

export default UserList;

const columns: ColumnDef<CollectionAccount, any>[] = [
  {
    header: "Name",
    accessorKey: "accountName",
  },
  {
    header: "Role",
    accessorKey: "accountNumber",
  },
  {
    header: "Email",
    accessorKey: "bankName",
  },
  {
    header: "Phone number",
    accessorKey: "mobileNumber",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: () => <UserStatus />,
  },
  {
    header: "Date Created",
    accessorKey: "dateCreated",
    cell: ({ getValue }) =>
      getValue() ? (
        <Typography>
          {dfns.format(getValue(), "dd-MMM-yyyy hh:mm:ss aaa")}
        </Typography>
      ) : (
        <Typography>--</Typography>
      ),
  },

  {
    header: "Actions",
    id: "actions",
    size: 80,
    cell: () => <UserTableAction />,
  },
];
