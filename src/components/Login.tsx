import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Container, Link } from "@mui/material";
import { useAppDispatch } from "../store/store";
import { setTokens } from "../store/authReducer";
import { useLoginUserMutation } from "../services/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false); // New state for showing/hiding the "Forgot Password" button
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

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
      setShowForgotPassword(true); // Show the "Forgot Password" button if authentication fails
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
            {showForgotPassword && ( // Render the "Forgot Password" button if showForgotPassword is true
              <Link href="/forgot-password" style={{ marginTop: '16px' }}>Forgot Password</Link>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
