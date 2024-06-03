import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button, Container } from "@mui/material";

interface User {
  name: string;
  phoneNumber: string;
  password: string; // New password field
}

const Home: React.FC = () => {
  const [formData, setFormData] = useState<User>({ name: "", phoneNumber: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Make API call to verify user
      const response = await verifyUser(formData);
    
      // Determine if user is admin or regular user based on API response
      if (response.isAdmin) {
        // Navigate to admin page
        navigate("/admin");
      } else {
        // Navigate to user page
        navigate("/user");
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      // Handle error
    }
  };

  const verifyUser = async (user: User) => {
    try {
      // Make API call to verify user
      const response = await axios.post<{ isAdmin: boolean }>("http://localhost:4000/api/user/", user);
      return response.data;
    } catch (error) {
      console.error("Error verifying user:", error);
      throw error; // Rethrow the error for handling in the handleSubmit function
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h2" align="center" gutterBottom>
          Home Page
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <TextField
              label="Name"
              variant="outlined"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Password" // New password field
              variant="outlined"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Home;
