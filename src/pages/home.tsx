import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useAppDispatch } from "../store/store";
import { setTokens } from "../store/authReducer";
interface User {
  name: string;
  email: string; // Switched from phoneNumber to email
  password: string;
}

const Home: React.FC = () => {
  const [formData, setFormData] = useState<User>({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const response = await verifyUser(formData);

      // if (response.isAdmin) {
      //   // Navigate to admin page
      //   navigate("/admin");
      // } else {
      //   // Navigate to user page
      //   navigate("/user");
      // }
      const response = await axios.post("http://localhost:4000/api/user/login", formData);

      if(response){
        console.log(response);
        const accessToken = response.data.data.accessToken;
        console.log(response.data.data.user.isAdmin);
        dispatch(setTokens({
          accessToken: accessToken,
          refreshToken: '',
          isAuthenticated:true,
          isAdmin: response.data.data.user.isAdmin
      })); 
        if(response.data.data.user.isAdmin){
          navigate("/admin");
        }
        else{
          navigate("/user");
        }
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      // Handle error
    }
  };

  // const verifyUser = async (user: User) => {
  //   try {
  //     // Make API call to verify user
  //     const response = await axios.post<{ isAdmin: boolean }>("http://localhost:4000/api/user/login", user);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error verifying user:", error);
  //     throw error; // Rethrow the error for handling in the handleSubmit function
  //   }
  // };
  
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
              label="Email" // Switched from "Phone Number" to "Email"
              variant="outlined"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Password"
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
