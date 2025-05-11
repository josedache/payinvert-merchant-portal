import { Outlet } from "react-router-dom";
import AuthBackgroundSvg from "assets/svgs/auth-background.svg?react";
import { Container } from "@mui/material";
import Logo from "components/Logo.tsx";

function Auth() {
  return (
    <>
      <Container className="relative h-full">
        <div className="h-full flex items-center justify-center py-4">
          <div className="w-full max-w-lg">
            <div className="flex justify-center items-center mb-6">
              <Logo />
            </div>
            <Outlet />
          </div>
        </div>

        <div className="absolute left-0 bottom-0 -z-10">
          <AuthBackgroundSvg />
        </div>
      </Container>
    </>
  );
}

export default Auth;

export const Component = Auth;
