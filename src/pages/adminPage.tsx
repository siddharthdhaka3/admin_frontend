import React, { useEffect } from 'react';
import { useAppDispatch } from "../store/store";
import { addUser } from '../store/userSlice'; 
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AdminHeader from '../components/AdminHeader';
import AddUserForm from '../components/AddUserForm';
import UserTable from '../components/UserTable';
import SideMenu from '../components/SideMenu'; // Import the SideMenu component
import { useGetAllUsersQuery } from '../services/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex', // Use flex display to arrange side menu and content
      margin: 0, // Remove default margin
    },
    content: {
      flexGrow: 1, // Allow content to take remaining space
      padding: theme.spacing(2),
      backgroundColor: 'rgba(178, 178, 178, 0.5)', // Set the background color of the content area with 50% opacity
      minHeight: '100vh',
    },
    formContainer: {
      marginBottom: theme.spacing(2),
    },
    tableContainer: {
      backgroundColor: '#fff', // Set the background color of the table container to white
      borderRadius: theme.spacing(1), // Apply rounded corners to the table container
      overflow: 'hidden', // Ensure overflow content within the table container is hidden
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
      {/* Render the SideMenu component */}
      <SideMenu />
      <div className={classes.content}>
        <AdminHeader />
        <Typography variant="body1">Add new user through email:</Typography>
        <Grid container>
          <Grid item xs={12} className={classes.formContainer}>
            {/* <AddUserForm /> */}
          </Grid>
        </Grid>
        {/* Wrap the UserTable component with a div */}
        <div className={classes.tableContainer}>
          <UserTable />
        </div>
      </div>
    </div>
  );
};
  
export default AdminPage;
