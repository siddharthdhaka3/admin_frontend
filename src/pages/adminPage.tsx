import React, { useEffect} from 'react';
import { useAppDispatch} from "../store/store";
import { addUser } from '../store/userSlice'; 
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AdminHeader from '../components/AdminHeader';
import AddUserForm from '../components/AddUserForm';
import UserTable from '../components/UserTable';
import { useGetAllUsersQuery } from '../services/api';

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

  // Fetch users using the generated query hook
  const { data: allUsers = [], isSuccess } = useGetAllUsersQuery();  
  // Automatically adds users to the Redux store when data changes
  useEffect(() => {
    if (isSuccess) {
      allUsers.forEach(user => {
        dispatch(addUser(user));
      });
    }
  }, [dispatch, allUsers, isSuccess]);
  
    return (
      <div className={classes.root}>
        <AdminHeader />
        <Typography variant="body1">Add new user through email:</Typography>
        <Grid container>
          <Grid item xs={12} className={classes.formContainer}>
            <AddUserForm />
          </Grid>
        </Grid>
        <UserTable />
      </div>
    );
  };
  
  export default AdminPage; // Empty dependency array to run effect only once

  
