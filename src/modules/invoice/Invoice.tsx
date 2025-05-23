import { Outlet } from "react-router-dom";

function Invoice() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Invoice;

export const Component = Invoice;
