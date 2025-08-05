import useToggle from "hooks/use-toggle";
import { useSnackbar } from "notistack";
import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
} from "react";
import { useFormik } from "formik";
import { subsidiaryDashboardRoleApi } from "apis/subsidiary-dashboard-role";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  FormControlLabel,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import LoadingContent from "components/LoadingContent";
import { subsidiaryEnumApi } from "apis/subsidiary-enum";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import { Icon as Iconify } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import { getTextFieldProps } from "utils/formik/get-text-field-props";

function RoleCreateEdit(props: RoleCreateEditProps) {
  const { id, children, onClose, ...restProps } = props;

  const { enqueueSnackbar } = useSnackbar();

  const isEdit = !!id;

  const [isEditName, toggleEditName] = useToggle(!isEdit);

  const [isOpen, toggleOpen, setOpen] = useToggle();

  const [createRoleMutation] =
    subsidiaryDashboardRoleApi.useCreateSubsidiaryDashboardRoleMutation();

  const [updateRoleMutation] =
    subsidiaryDashboardRoleApi.useUpdateSubsidiaryDashboardRoleMutation();

  const moduleEnumsQueryResult =
    subsidiaryEnumApi.useGetModuleEnumsQuery(undefined);

  const moduleEnums = moduleEnumsQueryResult.data;

  const roleActionsEnumsQueryResult =
    subsidiaryEnumApi.useGetRoleActionsEnumsQuery(undefined);

  const roleActionsEnums = roleActionsEnumsQueryResult.data;

  const roleQueryResult =
    subsidiaryDashboardRoleApi.useGetSubsidiaryDashboardRoleQuery(
      useMemo(() => ({ path: { roleId: id } }), [id]),
      { skip: !isEdit }
    );

  const role = roleQueryResult.data?.data;

  const initialValues = useMemo(() => {
    // const normalizedPermissionModel = role?.permissionModel?.reduce(
    //   (acc, curr) => {
    //     acc[
    //       JSON.stringify({
    //         moduleEnum: curr.name,
    //         action: curr.name,
    //       })
    //     ] = curr;
    //     return acc;
    //   },
    //   {} as {
    //     [key: string]: {
    //       moduleEnum: string;
    //       action: string;
    //       value: boolean;
    //     };
    //   }
    // );

    return {
      name: role?.name ?? "",
      permissionModel: role?.permissionModel ?? [],
      // permissionModel:
      //   moduleEnums
      //     ?.map((moduleEnum) => {
      //       return (
      //         roleActionsEnums?.map((roleAction) => {
      //           return {
      //             moduleEnum: moduleEnum.name,
      //             action: roleAction.name,
      //             value:
      //               normalizedPermissionModel?.[
      //                 JSON.stringify({
      //                   moduleEnum: moduleEnum.name,
      //                   action: roleAction.name,
      //                 })
      //               ]?.value ?? false,
      //           };
      //         }) ?? []
      //       );
      //     })
      //     .flatMap((item) => item) ?? [],
    };
  }, [role, moduleEnums, roleActionsEnums]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const func = isEdit ? updateRoleMutation : createRoleMutation;
        const data = await func({
          path: { roleId: id },
          body: {
            ...values,
          },
        }).unwrap();
        enqueueSnackbar(
          data?.message ??
            `Role ${isEdit ? "created" : "updated"} successfully`,
          {
            variant: "success",
          }
        );
        handleClose();
      } catch (error) {
        enqueueSnackbar(
          error?.data?.message ||
            (Object.values(error?.data?.errors) as string[])?.[0]?.[0] ||
            `Failed to ${isEdit ? "update" : "create"} Role`,
          { variant: "error" }
        );
      }
    },
  });

  const normalizedPermissionModel = formik.values?.permissionModel?.reduce(
    (acc, curr, index) => {
      acc[
        JSON.stringify({
          moduleEnum: curr.moduleEnum,
          action: curr.action,
        })
      ] = [curr, index];
      return acc;
    },
    {} as {
      [key: string]: [
        {
          moduleEnum: string;
          action: string;
          value: boolean;
        },
        number,
      ];
    }
  );

  function handleClose(event?: any, action?: any) {
    setOpen(false);
    onClose?.(event, action);
    formik.resetForm();
  }

  const contentJsx = (
    <LoadingContent
      loading={roleQueryResult.isLoading}
      error={roleQueryResult.isError}
      onRetry={roleQueryResult.refetch}
    >
      {() => (
        <div className="space-y-4">
          {isEditName ? (
            <TextField
              label="Name"
              fullWidth
              {...getTextFieldProps(formik, "name")}
            />
          ) : (
            <div className="flex items-center gap-4">
              <Typography variant="h6" className="font-semibold">
                {role?.name}
              </Typography>
              <IconButton onClick={toggleEditName}>
                <Icon>
                  <Iconify icon="mdi:pencil-outline" />
                </Icon>
              </IconButton>
            </div>
          )}

          {/*<div className="flex items-center gap-4">*/}
          {/*  <Iconify*/}
          {/*    fontSize="20px"*/}
          {/*    className="MuiIcon-root"*/}
          {/*    color="#616161"*/}
          {/*    icon="tdesign:user-setting"*/}
          {/*  />*/}
          {/*  <Typography className="font-medium text-[#616161]">*/}
          {/*    Admins with this role: Sandra Ibe, Omotoyosi Bakare +1*/}
          {/*  </Typography>*/}
          {/*</div>*/}

          <LoadingContent
            loading={
              moduleEnumsQueryResult.isLoading ||
              roleActionsEnumsQueryResult.isLoading
            }
            error={
              moduleEnumsQueryResult.isError ||
              roleActionsEnumsQueryResult.isError
            }
            onRetry={() => {
              if (moduleEnumsQueryResult.isError) {
                moduleEnumsQueryResult.refetch();
              }

              if (roleActionsEnumsQueryResult.isError) {
                roleActionsEnumsQueryResult.refetch();
              }
            }}
          >
            {() => (
              <>
                <div className="space-y-4">
                  {moduleEnums?.map((moduleEnum) => {
                    return (
                      <div>
                        <Typography variant="h6">{moduleEnum.name}</Typography>
                        <div className="grid grid-cols-4">
                          {roleActionsEnums
                            ?.filter(
                              (roleActionEnum) =>
                                roleActionEnum.name?.toLowerCase() !== "none"
                            )
                            ?.map((roleActionEnum) => {
                              const [selected, selectedIndex] =
                                normalizedPermissionModel?.[
                                  JSON.stringify({
                                    moduleEnum: moduleEnum.name,
                                    action: roleActionEnum.name,
                                  })
                                ] ?? [];

                              return (
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label={roleActionEnum.name}
                                  checked={!!selected?.value}
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const newPermissionModel = [
                                      ...formik.values.permissionModel,
                                    ];

                                    if (e.target.checked) {
                                      if (selected) {
                                        newPermissionModel[
                                          selectedIndex
                                        ].value = true;
                                      } else {
                                        newPermissionModel.push({
                                          moduleEnum: moduleEnum.name,
                                          action: roleActionEnum.name,
                                          value: true,
                                        });
                                      }

                                      formik.setFieldValue(
                                        "permissionModel",
                                        newPermissionModel
                                      );
                                    } else {
                                      newPermissionModel[selectedIndex] = {
                                        ...newPermissionModel[selectedIndex],
                                        value: false,
                                      };

                                      formik.setFieldValue(
                                        "permissionModel",
                                        newPermissionModel
                                      );
                                    }
                                  }}
                                />
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </LoadingContent>
        </div>
      )}
    </LoadingContent>
  );

  const cancelJsx = (
    <Button variant="outlined" onClick={handleClose}>
      Cancel
    </Button>
  );

  const submitButtonJsx = (
    <LoadingButton
      type="submit"
      disabled={!formik.isValid || !formik.dirty}
      loading={formik.isSubmitting}
      loadingPosition="end"
      endIcon={<></>}
      startIcon={
        <Icon>
          <Iconify icon="mdi:pencil-outline" />
        </Icon>
      }
    >
      {isEdit ? "Update" : "Create"} Role
    </LoadingButton>
  );

  if (props.view === "content") {
    return (
      <form onSubmit={formik.handleSubmit as any}>
        {contentJsx}
        <div className="flex items-center justify-end gap-2 mt-8">
          {cancelJsx}
          {submitButtonJsx}
        </div>
      </form>
    );
  }

  return (
    <>
      <Dialog
        component="form"
        onSubmit={formik.handleSubmit as any}
        fullWidth
        open={isOpen}
        {...restProps}
      >
        <DialogTitleXCloseButton onClose={handleClose}>
          {isEdit ? "Update" : "Create"} Role
        </DialogTitleXCloseButton>
        <DialogContent className="py-4">{contentJsx}</DialogContent>
        <DialogActions>
          {cancelJsx}
          {submitButtonJsx}
        </DialogActions>
      </Dialog>

      {typeof children === "function"
        ? children({ isOpen, toggleOpen, setOpen })
        : children}
    </>
  );
}

export default RoleCreateEdit;

export type RoleCreateEditProps = {
  id?: any;
  view?: "content" | "dialog";
  open?: boolean;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: Dispatch<SetStateAction<boolean>>;
      }) => ReactNode);
} & Omit<DialogProps, "children" | "open" | "id">;
