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
import * as yup from "yup";
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
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import LoadingContent from "components/LoadingContent";
import { subsidiaryEnumApi } from "apis/subsidiary-enum";
import DialogTitleXCloseButton from "components/DialogTitleXCloseButton";
import { Icon as Iconify } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import { getTextFieldProps } from "utils/formik/get-text-field-props";
import { SubsidiaryDashboardRole } from "types/subsidiary-dashboard-role";

function RoleCreateEdit(props: RoleCreateEditProps) {
  const { id, onSuccess, children, onClose, ...restProps } = props;

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

  const roleDetails = roleQueryResult.data?.data;

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
      name: roleDetails?.role?.name ?? "",
      permissionModel:
        roleDetails?.permission?.flatMap((item) =>
          item.actions.map((action) => ({
            moduleEnum: item.moduleEnum,
            action: action.action,
            value: action.value,
          }))
        ) ?? [],
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
  }, [roleDetails, moduleEnums, roleActionsEnums]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().label("Name").trim().required(),
      permissionModel: yup.array().of(
        yup.object({
          moduleEnum: yup.number().label("Module").required(),
          action: yup.number().label("Action").required(),
          value: yup.boolean().label("Value").required(),
        })
      ),
    }),
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
        onSuccess?.(data?.data ?? roleDetails?.role);
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
          moduleEnum: number;
          action: number;
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
                {roleDetails?.role?.name}
              </Typography>
              <IconButton onClick={toggleEditName} className="hidden">
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
                                    moduleEnum: moduleEnum.value,
                                    action: roleActionEnum.value,
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
                                          moduleEnum: moduleEnum.value,
                                          action: roleActionEnum.value,
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
      // disabled={!formik.isValid || !formik.dirty}
      disabled={!formik.isValid}
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
      <LoadingContent
        loading={roleQueryResult.isFetching}
        error={roleQueryResult.isError}
        onRetry={roleQueryResult.refetch}
        renderLoading={renderLoading}
      >
        {() => (
          <form onSubmit={formik.handleSubmit as any}>
            {contentJsx}
            <div className="flex items-center justify-start gap-2 mt-8">
              {onClose ? cancelJsx : null}
              {submitButtonJsx}
            </div>
          </form>
        )}
      </LoadingContent>
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
        <LoadingContent
          loading={roleQueryResult.isFetching}
          error={roleQueryResult.isError}
          onRetry={roleQueryResult.refetch}
          renderLoading={renderLoading}
        >
          {() => (
            <>
              <DialogContent className="py-4">{contentJsx}</DialogContent>
              <DialogActions>
                {cancelJsx}
                {submitButtonJsx}
              </DialogActions>
            </>
          )}
        </LoadingContent>
      </Dialog>

      {typeof children === "function"
        ? children({ isOpen, toggleOpen, setOpen })
        : children}
    </>
  );
}

export default RoleCreateEdit;

export function renderLoading() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 w-full space-y-4">
        <Skeleton variant="text" className="max-w-[120px]" />
        {Array(3)
          .fill(3)
          .map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton variant="text" key={i} className="max-w-[100px]" />
              <div className="grid grid-cols-4 gap-2">
                {Array(4)
                  .fill(4)
                  .map((i) => (
                    <div key={i} className="flex items-center gap-1">
                      <Skeleton variant="rounded" className="w-3 h-3" />
                      <Skeleton variant="text" className="w-[100px]" />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export type RoleCreateEditProps = {
  id?: any;
  view?: "content" | "dialog";
  onSuccess?: (role: SubsidiaryDashboardRole) => void;
  open?: boolean;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        toggleOpen: () => void;
        setOpen: Dispatch<SetStateAction<boolean>>;
      }) => ReactNode);
} & Omit<DialogProps, "children" | "open" | "id">;
