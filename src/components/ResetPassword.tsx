import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useResetPasswordMutation } from "../services/api"; 
import { useNavigate } from "react-router-dom"; 
const ResetPassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const [mutate, { isLoading: isResetting, isError: resetError }] = useResetPasswordMutation();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsError(false);
      setIsLoading(true);
  
      try {
        // Call the reset password API using the mutate function
        await mutate({ Password });
        navigate("/");

    } catch (error) {
        console.error("Error resetting password:", error);
        setIsError(true);
        // Optionally provide error feedback to the user
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Box mt={4}>
          <Typography variant="h2" align="center" gutterBottom>
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <TextField
                label="Current Password"
                variant="outlined"
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                fullWidth
                style={{ marginBottom: '16px' }}
              />
              <TextField
                label="New Password"
                variant="outlined"
                id="newPassword"
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                style={{ marginBottom: '16px' }}
              />
              <Button type="submit" variant="contained" color="primary" disabled={isLoading || isResetting}>
                {isResetting ? "Resetting..." : "Reset Password"}
              </Button>
              {isError || resetError && (
                <Typography variant="body1" color="error" style={{ marginTop: '16px' }}>
                  Error resetting password. Please try again.
                </Typography>
              )}
            </Box>
          </form>
        </Box>
      </Container>
    );
  };
  
  export default ResetPassword;