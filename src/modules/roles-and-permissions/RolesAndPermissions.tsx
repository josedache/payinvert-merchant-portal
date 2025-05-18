import { Outlet } from "react-router-dom";

function RolesAndPermissions() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default RolesAndPermissions;

export const Component = RolesAndPermissions;
