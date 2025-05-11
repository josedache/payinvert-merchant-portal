import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReduxStoreProvider from "providers/ReduxStoreProvider.tsx";
import MuiThemeProvider from "./providers/MuiThemeProvider.tsx";
import MuiDatePickerProvider from "./providers/MuiDatePickerProvider.tsx";
import MuiSnackbarProvider from "./providers/MuiSnackbarProvider.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./router";

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
