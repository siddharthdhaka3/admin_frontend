import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useForgotPasswordMutation } from "../services/api"; // Import the hook for the new mutation
import { useNavigate } from "react-router-dom"; 

const ForgotPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [forgotPassword] = useForgotPasswordMutation(); // Initialize the hook for the new mutation
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        setResponseMessage("Passwords do not match.");
        return;
      }

      // Retrieve token from URL
      const urlParams = new URLSearchParams(window.location.search);
      const token:any = urlParams.get('token');

      // Call forgotPassword mutation with password and token
      const response = await forgotPassword({ password, token });

      // Handle response
      if (response.error) {
        setResponseMessage("error");
      } else {
        setResponseMessage("Password reset successfully!");
        navigate("/")
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h2" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <TextField
              label="New Password"
              variant="outlined"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Confirm New Password"
              variant="outlined"
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            {responseMessage && (
              <Typography style={{ marginTop: '16px' }}>{responseMessage}</Typography>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
