import React from "react";
import { observer } from "mobx-react-lite";

import { useStoreContext } from "context";

import { useValidationSchema } from "../../hooks";
import { useForm } from "hooks";

import { Box, Button, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { AuthFormContainer, LoginCard } from "./styled";
import { MoreHorizSharp } from "@mui/icons-material";


const AuthForm: React.FC = React.memo(
  observer(() => {
    const {
      authStore: { pending, login },
    } = useStoreContext();

    const { validationSchema, initialValues } = useValidationSchema();
    const { errors, touched, isValid, fieldProps, handleSubmit } = useForm({
      initialValues,
      validationSchema,
      enableReinitialize: true,
      onSubmit(values) {
        login(values);
      },
    });

    return (
      <AuthFormContainer>
        <LoginCard variant="outlined">
          <Typography component="h1" variant="h4" sx={{ width: "100%", textAlign: "center" }}>
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 1.6,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>

              <TextField
                {...fieldProps("username")}
                error={!!errors.username && touched.username}
                helperText={errors.username && touched.username ? errors.username : ""}
                id="username"
                name="username"
                placeholder="Enter your username"
                autoComplete="username"
                fullWidth
                variant="outlined"
                color={errors.username && touched.username ? "error" : "primary"}
                sx={{ ariaLabel: "username" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>

              <TextField
                {...fieldProps("password")}
                error={!!errors.password && touched.password}
                helperText={errors.password && touched.password ? errors.password : ""}
                name="password"
                placeholder="Enter your password"
                type="password"
                id="password"
                autoComplete="current-password"
                fullWidth
                variant="outlined"
                color={errors.password && touched.password ? "error" : "primary"}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained" disabled={!isValid || pending}>
              {pending ? <MoreHorizSharp /> : "Sign In"}
            </Button>
          </Box>
        </LoginCard>
      </AuthFormContainer>
    );
  }),
);

AuthForm.displayName = "AuthForm";

export default AuthForm;
