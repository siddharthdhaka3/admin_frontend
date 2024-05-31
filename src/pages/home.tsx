import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Import app.css

interface User {
  name: string;
  phoneNumber: string;
}

const Home: React.FC = () => {
  const [formData, setFormData] = useState<User>({ name: "", phoneNumber: "" });
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
    <div className="container">
      <h1 className="title">Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default Home;
