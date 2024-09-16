import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "theme";

import Navigation from "navigation";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ErrorBoundary } from "components";
import { StoreProvider } from "context";

const RootApp: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <StoreProvider>
          <CssBaseline />
          <Navigation />
        </StoreProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default RootApp;

const router = createBrowserRouter([{ path: "*", Component: RootApp }]);

export const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
