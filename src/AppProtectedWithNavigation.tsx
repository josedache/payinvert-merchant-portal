import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import AppProtectedHeader from "./AppProtectedHeader";
import AppProtectedDrawer from "./AppProtectedDrawer";

import useSidebarIcon from "hooks/use-sidebar-icon";

function AppProtectedWithNavigation() {
  const sidebarIcon = useSidebarIcon();

  return (
    <>
      <AppProtectedDrawer />
      <AppProtectedHeader />
      <div
        className={clsx(sidebarIcon.isOpen ? "lg:ml-[270px]" : "lg:ml-[80px]")}
      >
        <Container className="p-4 md:p-8">{<Outlet />}</Container>
      </div>
    </>
  );
}

export const Component = AppProtectedWithNavigation;

export default AppProtectedWithNavigation;
