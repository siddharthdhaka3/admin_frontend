import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../store/store";
import { setTokens } from "../store/authReducer";
import { setCurrentUser } from "../store/currentUserSlice";
import { useLoginUserMutation, useAddUserByEmailMutation } from "../services/api"; // Import the hook for the new mutation

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [addUserByEmail, { isLoading: isForgotPasswordLoading }] = useAddUserByEmailMutation(); // Initialize the hook for the new mutation
  const [forgotPasswordResponse, setForgotPasswordResponse] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;

    try {
      const response = await loginUser({ email, password }).unwrap();
      console.log(response);
      
      dispatch(
        setTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          isAuthenticated: true,
          isAdmin: response.user.isAdmin,
          tokenExpiry: response.accessTokenExpiry,
        }),
        setCurrentUser({
          name: response.user.name,
          email: response.user.email,
        }),
        
      );

      dispatch(
        setCurrentUser({
          name: response.user.name,
          email: response.user.email,
        })
      );

      console.log(response.user.name);
      

      if (response.user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      setShowForgotPassword(true);
    }
  };

  const handleForgotPasswordClick = async () => {
    try {
      const response = await addUserByEmail({ email: watch('email') }); // Call the addUserByEmail mutation with the email from the form
      if ("error" in response) {
        setForgotPasswordResponse("The email doesn't exist");
      } else {
        setForgotPasswordResponse("Reset password link sent");
      }
    } catch (error) {
      console.error("Error adding user by email:", error);
      setForgotPasswordResponse("An error occurred. Please try again."); // Handle other errors
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h2" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  style={{ marginBottom: "16px" }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  style={{ marginBottom: "16px" }}
                />
              )}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            {showForgotPassword && (
              <Box marginTop="16px">
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={isForgotPasswordLoading}
                  onClick={handleForgotPasswordClick}
                >
                  {isForgotPasswordLoading ? "Sending..." : "Forgot Password"}
                </Button>
                {forgotPasswordResponse && <Typography>{forgotPasswordResponse}</Typography>}
              </Box>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
