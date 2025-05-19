import { Outlet } from "react-router-dom";

function RoleAndPermission() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default RoleAndPermission;

export const Component = RoleAndPermission;
