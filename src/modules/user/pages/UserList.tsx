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
import * as CustomIcon from "assets/icons";

import { useSnackbar } from "notistack";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import { LoadingButton } from "@mui/lab";
import getPhoneNumberTest from "utils/formik/get-phone-number-test";
import PhoneNumberTextField from "components/PhoneNumberTextField";
import UserPreview from "../features/UserPreview";

function UserList() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userEmail: "",
      mobileNumber: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().label("First Name").trim().required(),
      lastName: yup.string().label("Last Name").trim().required(),
      userEmail: yup.string().label("Email").email().trim().required(),
      mobileNumber: yup
        .string()
        .label("Mobile Number")
        .trim()
        .test(getPhoneNumberTest())
        .required(),
    }),
    onSubmit: async () => {
      try {
        // console.log("submitted value ", {
        //   ...values,
        //   mobileNumber: getPhoneNumberInfo(values?.mobileNumber)
        //     ?.nationalNumberNormalized,
        // });
        setUserState("COMPLETE_CREATE");
        // await createCollectionAccountMutation({
        //   body: values,
        // }).unwrap();

        // enqueueSnackbar("Collection account created successfully", {
        //   variant: "success",
        // });

        // handleClose();
      } catch (error: any) {
        enqueueSnackbar(
          error?.data?.message ||
            "Failed to create collection account. Please try again.",
          { variant: "error" }
        );
      }
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  // function handleClose(e?: any, reason?: any) {
  //   formik.resetForm();
  //   // onClose?.(e, reason);
  //   // setOpen(false);
  // }

  const [pagination, setPagination] = usePagination();
  // const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [userStage, setUserState] = useState<
    "EMPTY" | "NOT_EMPTY" | "CREATE" | "COMPLETE_CREATE"
  >("COMPLETE_CREATE");
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
      <PageTitle>Users</PageTitle>
      {userStage === "EMPTY" && (
        <div className="min-w-full md:min-h-[650px] flex flex-col justify-center items-center mx-auto ">
          <div className="p-4 md:p-8 w-full md:w-2/5 rounded-lg shadow bg-white gap-3 flex flex-col items-center">
            <CustomIcon.AddUser />
            <h1 className="text-xl font-bold">Create your first user</h1>
            <div className="text-sm text-center">
              Currently, no users exist. Create one now to manage your business
              better, improve efficiency, and unlock smoother operations.
            </div>
            <Button
              onClick={() => setUserState("CREATE")}
              className="w-full"
              startIcon={
                <Icon>
                  <Iconify icon="mdi:user-add-outline" />
                </Icon>
              }
            >
              Create new user
            </Button>
          </div>
        </div>
      )}

      {userStage === "NOT_EMPTY" && (
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
      )}

      {userStage === "CREATE" && (
        <div className="min-w-full md:min-h-[650px] flex flex-col justify-center items-center mx-auto ">
          <Paper
            component="form"
            className="p-6"
            onSubmit={formik.handleSubmit}
          >
            <Typography variant="h6">Create New User</Typography>
            <div className=" rounded-lg mt-4 space-y-6">
              <div className="grid gap-6">
                <TextField
                  fullWidth
                  label="First name"
                  placeholder="Enter your first name"
                  {...getTextFieldProps(formik, "firstName")}
                  required
                />
                <TextField
                  fullWidth
                  label="Last name"
                  placeholder="Last name"
                  {...getTextFieldProps(formik, "lastName")}
                  required
                />

                <TextField
                  fullWidth
                  className="md:col-span-2"
                  label="Email Address"
                  placeholder="Enter your Email Address"
                  {...getTextFieldProps(formik, "userEmail")}
                  required
                />
                <PhoneNumberTextField
                  fullWidth
                  className="md:col-span-2"
                  label="Phone number"
                  placeholder="Enter your phone number"
                  {...getTextFieldProps(formik, "mobileNumber")}
                  required
                />

                <TextField
                  className="md:col-span-2"
                  fullWidth
                  label="Select role"
                  placeholder="Select user role"
                  {...getTextFieldProps(formik, "collectionAccountType")}
                  required
                  select
                >
                  <MenuItem key={"laoding-state"} value={"Loading..."}>
                    Loading...
                  </MenuItem>
                </TextField>
              </div>
              <div className="">
                <LoadingButton
                  // type="submit"
                  onClick={() => setUserState("COMPLETE_CREATE")}
                  className="w-full"
                  disabled={!formik.isValid || !formik.dirty}
                  loading={formik.isSubmitting}
                  loadingPosition="end"
                  endIcon={<></>}
                >
                  Save User
                </LoadingButton>
              </div>
            </div>
          </Paper>
        </div>
      )}

      {userStage === "COMPLETE_CREATE" && <UserPreview />}
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
