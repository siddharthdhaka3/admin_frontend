// AddUserForm.tsx
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface AddUserFormProps {
  onSubmit: (email: string, role: string) => void;
}

const AddUserForm: React.FC = () => {
    const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setEmail('');
    setRole('');
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
        <Grid item xs={4}>
          <TextField
            label="Role"
            variant="outlined"
            value={role}
            onChange={handleRoleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddUserForm;
