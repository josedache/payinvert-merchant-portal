import { Outlet } from "react-router-dom";

function User() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default User;

export const Component = User;
