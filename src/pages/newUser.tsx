import React from 'react';
import { useParams } from 'react-router-dom';
import UserRegisterForm from '../components/UserRegisterForm';

const NewUser: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // Extract token from URL

  return (
    <div>
      <h2>New User Registration</h2>
      <p>Welcome! Please fill out the form below to register as a new user.</p>
      <UserRegisterForm />
    </div>
  );
};

export default NewUser;
