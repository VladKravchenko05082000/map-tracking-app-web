import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  customColors: {
    main: "#ff5722",
    secondary: "#ff9800",
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 425,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  spacing: 10,
  typography: {
    body2: {
      fontSize: "24px",
    },
  },
  customComponents: {
    centerDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100%",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 1024,
          padding: "24px 16px",
          height: "100vh",
        },
      },
    },
  },
});

export default theme;
