import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../store/store";
import { RootState } from '../store/store';
import { addUser, updateUserStatus, deleteUser } from '../store/userSlice'; 
import axios from "axios";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AdminHeader from '../components/AdminHeader';
import AddUserForm from '../components/AddUserForm';
import UserTable from '../components/UserTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    formContainer: {
      marginBottom: theme.spacing(2),
    },
  }),
);

interface User {
  _id: string;
  name: string;
  email: string;
  blocked: boolean;
}

const AdminPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // Fetch users from Redux store
  const allUsers = useAppSelector((state: RootState) => state.user.users);
  const token = useAppSelector((state: RootState)=> state.auth.accessToken); 

  useEffect(() => {
    // Fetch users from backend
    axios.get<User[]>('http://localhost:4000/api/user/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        response.data.forEach(user => {
          dispatch(addUser(user));
        });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []); // Empty dependency array to run effect only once

  return (
    <div className={classes.root}>
      <AdminHeader />
      <Typography variant="body1">Add new user through email:</Typography>
      <Grid container>
        <Grid item xs={12} className={classes.formContainer}>
          <AddUserForm />
        </Grid>
      </Grid>
      <UserTable users={allUsers} />
    </div>
  );
};

export default AdminPage;
