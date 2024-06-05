import React from 'react';
import { Container } from '@mui/material';
import Login from '../components/Login';

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Login />
    </Container>
  );
};

export default Home;
