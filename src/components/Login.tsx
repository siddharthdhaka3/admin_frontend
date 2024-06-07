import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { setTokens } from "../store/authReducer";
import { useLoginUserMutation, useAddUserByEmailMutation } from "../services/api"; // Import the hook for the new mutation

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [addUserByEmail, { isLoading: isForgotPasswordLoading }] = useAddUserByEmailMutation(); // Initialize the hook for the new mutation
  const [forgotPasswordResponse, setForgotPasswordResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password }).unwrap();

      const accessToken = response.accessToken;
      dispatch(setTokens({
        accessToken: accessToken,
        refreshToken: '',
        isAuthenticated: true,
        isAdmin: response.user.isAdmin
      }));

      if(response.user.isAdmin) {
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
      const response = await addUserByEmail({ email }); // Call the addUserByEmail mutation with the email
      if (response.error) {
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
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <TextField
              label="Email"
              variant="outlined"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Password"
              variant="outlined"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              style={{ marginBottom: '16px' }}
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
