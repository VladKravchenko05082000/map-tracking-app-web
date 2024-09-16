import { Component, ErrorInfo } from "react";
import theme from "theme";

import { Box, Container, Typography } from "@mui/material";

import { ErrorBoundaryProps, ErrorBoundaryState } from "./types";


class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: "",
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Box
            sx={theme.customComponents.centerDiv}
          >
            <Typography variant="body2" component="p">
              {this.state.errorMessage}
            </Typography>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
