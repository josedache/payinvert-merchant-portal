import { Outlet } from "react-router-dom";

function Customer() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Customer;

export const Component = Customer;
