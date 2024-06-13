import React from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useResetPasswordMutation } from "../services/api"; 

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, getValues } = useForm<FormValues>();
  const navigate = useNavigate();
  const [mutate, { isLoading: isResetting, isError: resetError }] = useResetPasswordMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      await mutate({ Password: data.newPassword });
      navigate("/");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const isStrongPassword = (password: string) => {
    const criteria = {
      minLength: 3,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    };
    const regex = new RegExp(`^(?=.*[a-z]{${criteria.minLowercase},})(?=.*[A-Z]{${criteria.minUppercase},})(?=.*\\d{${criteria.minNumbers},})(?=.*[!@#$%^&*(),.?":{}|<>]{${criteria.minSymbols},}).{${criteria.minLength},}$`);
    return regex.test(password);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h2" align="center" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "New Password is required",
                validate: {
                  isStrongPassword: (value) => isStrongPassword(value) || "Password must be at least 3 characters long, include 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol",
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="New Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.newPassword}
                  helperText={errors.newPassword ? errors.newPassword.message : ""}
                  style={{ marginBottom: '16px' }}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Please confirm your password",
                validate: {
                  matchesNewPassword: (value) => value === getValues("newPassword") || "Passwords do not match",
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
                  style={{ marginBottom: '16px' }}
                />
              )}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isResetting}>
              {isResetting ? "Resetting..." : "Reset Password"}
            </Button>
            {(errors.newPassword || errors.confirmPassword || resetError) && (
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
