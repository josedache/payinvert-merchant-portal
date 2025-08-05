import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReduxStoreProvider from "providers/ReduxStoreProvider";
import MuiThemeProvider from "./providers/MuiThemeProvider";
import MuiDatePickerProvider from "./providers/MuiDatePickerProvider";
import MuiSnackbarProvider from "./providers/MuiSnackbarProvider";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { PRODUCTION } from "constants/env";

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ReduxStoreProvider>
        <MuiThemeProvider>
          <MuiDatePickerProvider>
            <MuiSnackbarProvider>
              <RouterProvider router={router} />
            </MuiSnackbarProvider>
          </MuiDatePickerProvider>
        </MuiThemeProvider>
      </ReduxStoreProvider>
    </StrictMode>
  );
});

async function enableMocking() {
  if (PRODUCTION) {
    return;
  }

  // const { worker } = await import("configs/msw-worker");
  //
  // // `worker.start()` returns a Promise that resolves
  // // once the Service Worker is up and ready to intercept requests.
  // return worker.start();
}
