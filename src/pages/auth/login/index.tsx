import { AuthForm } from "./components";
import { Box, Container } from "@mui/material";

import theme from "theme";

const Login: React.FC = () => {
  return (
    <Container>
      <Box sx={theme.customComponents.centerDiv}>
        <AuthForm />
      </Box>
    </Container>
  );
};

export default Login;
