import { Outlet } from "react-router-dom";

function Balances() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Balances;

export const Component = Balances;
