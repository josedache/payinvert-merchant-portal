import { Button, ButtonBase, Icon, Paper, Typography } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import PageTitle from "components/PageTitle.tsx";
import { subsidiaryDashboardRoleApi } from "apis/subsidiary-dashboard-role.ts";
import { useMemo, useState } from "react";
import RoleCreateEdit from "modules/role/pages/RoleCreateEdit.tsx";
import useToggle from "hooks/use-toggle.ts";

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
          {roles?.map((role) => (
            <ButtonBase
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
                {role?.name} ({role.permssionModel?.length || 0})
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
        </div>

        <div className="flex-1">
          <Paper className="p-4 md:p-6 w-full max-w-lg">
            {isCreate ? (
              <RoleCreateEdit view="content" onClose={toggleCreate} />
            ) : selectedId ? (
              <RoleCreateEdit view="content" id={selectedId} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <Icon className="text-6xl">
                  <Iconify icon="icon-park-twotone:permissions" />
                </Icon>
                <Typography variant="h6">No Role Selected</Typography>
              </div>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
};
export const Component = Role;
export default Role;
