import {
  Button,
  ButtonBase,
  Icon,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import PageTitle from "components/PageTitle";
import { subsidiaryDashboardRoleApi } from "apis/subsidiary-dashboard-role";
import { useMemo, useState } from "react";
import RoleCreateEdit, {
  renderLoading,
} from "modules/role/features/RoleCreateEdit";
import useToggle from "hooks/use-toggle";
import LoadingContent from "components/LoadingContent";

const Role = () => {
  const [isCreate, toggleCreate, setCreate] = useToggle();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const rolesQueryResult =
    subsidiaryDashboardRoleApi.useGetSubsidiaryDashboardRoleListQuery(
      useMemo(() => ({}), [])
    );

  const roles = rolesQueryResult.data?.data;

  return (
    <>
      <PageTitle>Roles & Permissions</PageTitle>
      <div className="flex flex-wrap gap-2">
        <div className="space-y-6 p-4 w-full max-w-sm">
          <LoadingContent
            loading={rolesQueryResult.isLoading}
            error={rolesQueryResult.isError}
            onRetry={rolesQueryResult.refetch}
            renderLoading={() => (
              <div className="w-full">
                <div className="grid grid-cols-1 gap-4 w-full max-w-[200px]">
                  {Array(4)
                    .fill(5)
                    .map((i) => (
                      <Skeleton
                        variant="rounded"
                        className="w-full h-[35px]"
                        key={i}
                      />
                    ))}
                </div>
              </div>
            )}
          >
            {() => (
              <>
                {roles?.map((role) => (
                  <ButtonBase
                    className="block"
                    onClick={() => {
                      setSelectedId(role.id);
                      setCreate(false);
                    }}
                    key={role.id}
                  >
                    <Typography
                      key={role.id}
                      className="text-base font-medium text-[#008243]"
                    >
                      {/*{role?.name} ({role.permssionModel?.length || 0})*/}
                      {role?.name} (0)
                    </Typography>
                  </ButtonBase>
                ))}

                <Button
                  className="font-semibold"
                  variant="contained"
                  startIcon={<Iconify icon="icon-park-twotone:permissions" />}
                  onClick={toggleCreate}
                  disabled={isCreate}
                >
                  Create custom role
                </Button>
              </>
            )}
          </LoadingContent>
        </div>

        <div className="flex-1">
          <Paper className="p-4 md:p-6 w-full max-w-lg">
            <LoadingContent
              loading={rolesQueryResult.isLoading}
              error={rolesQueryResult.isError}
              onRetry={rolesQueryResult.refetch}
              renderLoading={renderLoading}
            >
              {() => (
                <>
                  {isCreate ? (
                    <RoleCreateEdit
                      key={0}
                      view="content"
                      onClose={toggleCreate}
                      onSuccess={(role) => setSelectedId(role.id)}
                    />
                  ) : selectedId ? (
                    <RoleCreateEdit key={1} view="content" id={selectedId} />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Icon className="text-6xl">
                        <Iconify icon="icon-park-twotone:permissions" />
                      </Icon>
                      <Typography variant="h6">No Role Selected</Typography>
                    </div>
                  )}
                </>
              )}
            </LoadingContent>
          </Paper>
        </div>
      </div>
    </>
  );
};
export const Component = Role;
export default Role;
