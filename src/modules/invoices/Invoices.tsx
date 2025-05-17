import { Outlet } from "react-router-dom";

function Invoices() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Invoices;

export const Component = Invoices;
