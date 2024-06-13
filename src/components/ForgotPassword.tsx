import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useForgotPasswordMutation } from "../services/api"; // Import the hook for the new mutation
import { useNavigate } from "react-router-dom";

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ForgotPassword: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [responseMessage, setResponseMessage] = useState("");
  const [forgotPassword] = useForgotPasswordMutation(); // Initialize the hook for the new mutation
  const navigate = useNavigate(); // Hook for navigation

  const onSubmit = async (data: FormValues) => {
    const { password, confirmPassword } = data;

    try {
      if (password !== confirmPassword) {
        setResponseMessage("Passwords do not match.");
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const token:any = urlParams.get('token');
      const response = await forgotPassword({ password, token });

      if ('error' in response) {
        setResponseMessage("Error resetting password.");
      } else {
        setResponseMessage("Password reset successfully!");
        navigate("/");
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="New Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  style={{ marginBottom: '16px' }}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{ required: "Confirm password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm New Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
                  style={{ marginBottom: '16px' }}
                />
              )}
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
