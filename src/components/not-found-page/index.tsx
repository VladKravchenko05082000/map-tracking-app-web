import theme from "theme";

import { Box, Button, Container, Typography } from "@mui/material";

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Box sx={theme.customComponents.centerDiv}>
        <Typography variant="h2" component="h2">
          NotFoundPage
        </Typography>

        <Button variant="contained" sx={{ mt: 1.6 }}>
          Return back
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
