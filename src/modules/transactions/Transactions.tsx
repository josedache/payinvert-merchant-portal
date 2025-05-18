import { Outlet } from "react-router-dom";

function Transactions() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Transactions;

export const Component = Transactions;
