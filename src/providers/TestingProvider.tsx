import { ReactNode } from "react";
import MuiDatePickerProvider from "providers/MuiDatePickerProvider.tsx";
import ReduxStoreProvider from "providers/ReduxStoreProvider.tsx";
import MuiThemeProvider from "providers/MuiThemeProvider.tsx";
import MuiSnackbarProvider from "providers/MuiSnackbarProvider.tsx";

/**
 * A functional component that sets up various providers and configurations for the application.
 */
function TestingProvider(props: TestingLibraryProviderProps) {
  return (
    <MuiDatePickerProvider>
      <ReduxStoreProvider>
        <MuiThemeProvider>
          <MuiSnackbarProvider>{props.children}</MuiSnackbarProvider>
        </MuiThemeProvider>
      </ReduxStoreProvider>
    </MuiDatePickerProvider>
  );
}

export default TestingProvider;

export type TestingLibraryProviderProps = {
  children: ReactNode;
};
