import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Dashboard;

export const Component = Dashboard;
