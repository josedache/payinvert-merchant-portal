import { Outlet } from "react-router-dom";

function Transaction() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Transaction;

export const Component = Transaction;
