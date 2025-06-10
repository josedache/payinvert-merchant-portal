import { Outlet } from "react-router-dom";

function Wallet() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Wallet;

export const Component = Wallet;
