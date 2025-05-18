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
      <div className="px-4">
        <AppProtectedHeader />
        <div
          className={clsx(
            sidebarIcon.isOpen ? "lg:ml-[270px]" : "lg:ml-[80px]"
          )}
        >
          <Container className="px-0 py-4">{<Outlet />}</Container>
        </div>
      </div>
      <div className="h-1 bg-[#19943C] w-full fixed bottom-0 z-[1200]"></div>
    </>
  );
}

export const Component = AppProtectedWithNavigation;

export default AppProtectedWithNavigation;
