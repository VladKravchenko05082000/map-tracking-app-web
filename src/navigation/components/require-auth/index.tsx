import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useStoreContext } from "context";

import { Box, Button, Container, Typography } from "@mui/material";

import { ROUTES } from "navigation/routes";

const RequireAuth: React.FC<PropsWithChildren<{}>> = observer(({ children }) => {
  const {
    authStore: { isAuthenticated, resetAuthStore },
    mapStore: { resetMapStore },
  } = useStoreContext();

  const handleLogout = () => {
    resetMapStore();
    resetAuthStore();
  };

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  } else {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "65%",
            mb: 1.6,
          }}
        >
          <Button onClick={handleLogout} variant="outlined">
            Logout
          </Button>

          <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>
            Tracking App
          </Typography>
        </Box>

        {children}
      </Container>
    );
  }
});

export default RequireAuth;
