import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useRegisterUserWithResetLinkMutation } from '../services/api';

const AddUserForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [registerUserWithResetLink, { isLoading, isError }] = useRegisterUserWithResetLinkMutation();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    registerUserWithResetLink({ email})
      .unwrap()
      .then((data) => {
        // Handle successful registration
        console.log('User registered:', data);
      })
      .catch((error) => {
        // Handle registration error
        console.error('Error registering user:', error);
      });
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
      {isError && <div>Error occurred while registering user</div>}
    </form>
  );
};

export default AddUserForm;
