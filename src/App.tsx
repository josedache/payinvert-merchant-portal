import { LinearProgress } from "@mui/material";
import "./App.css";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigation = useNavigation();

  useEffect(() => {
    const handlePreloadError = () => {
      window.location.reload();
    };

    window.addEventListener("vite:preloadError", handlePreloadError);

    return () => {
      window.removeEventListener("vite:preloadError", handlePreloadError);
    };
  }, []);

  return (
    <>
      {navigation.state !== "idle" ? (
        <div className="z-[2000] fixed top-0 h-[100vh] w-full backdrop-blur-sm">
          <LinearProgress
            className="fixed top-0 left-0 z-[2000] w-full"
            color="primary"
          />
        </div>
      ) : null}
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export default App;

export const Component = App;
