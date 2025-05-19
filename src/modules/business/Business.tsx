import { Outlet } from "react-router-dom";

function Business() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Business;

export const Component = Business;
