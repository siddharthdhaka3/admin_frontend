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
import Footer from '../components/AdminFooter';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex', // Use flex display to arrange side menu and content
      margin: 0, // Remove default margin
    },
    content: {
      flexGrow: 1, // Allow content to take remaining space
      // padding: theme.spacing(2),
      backgroundColor: 'rgba(178, 178, 178, 0.5)', // Set the background color of the content area with 50% opacity
      minHeight: '100vh',
      position: 'relative', // Ensure position is relative for positioning absolute children
    },
    formContainer: {
      marginBottom: theme.spacing(2),
      margin: 0, // Remove margin
    },
    tableContainer: {
      backgroundColor: '#fff', // Set the background color of the table container to white
      borderRadius: theme.spacing(5), // Apply rounded corners to the table container
      overflow: 'hidden', // Ensure overflow content within the table container is hidden
      border: 'none', // Remove border
    },
    emptyDiv: {
      backgroundColor:'white',
      width: '100%',
      height: '86px',
      position: 'relative', // Ensure position is relative for positioning absolute children
    },
    userDetails: {
      position: 'absolute', // Position the user details absolutely
      top: '50%', // Align to the vertical center
      right: '10px', // Align to the very right side with some spacing
      transform: 'translateY(-50%)', // Center vertically
      display: 'flex', // Use flexbox layout
      flexDirection: 'column', // Stack user details vertically
      alignItems: 'flex-end', // Align user details to the right
    },
    adminHeaderContainer: {
      marginTop: '10px',
      marginLeft: '10px', // Add margin to the top of admin header
    },
    footer:{
      position: 'absolute',
      left:0,
      bottom:0,
      right:0,
      marginTop: 'auto', // Push footer to the bottom
      backgroundColor: '#fff',
      flexShrink: 0,
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
  
  // Sample logged-in user data
  const loggedInUser = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className={classes.root}>
      {/* Render the SideMenu component */}
      <SideMenu />
      <div className={classes.content}>
        <div className={classes.emptyDiv}>
          {/* Display logged-in user details */}
          <div className={classes.userDetails}>
            <Typography variant="body1">{loggedInUser.name}</Typography>
            <Typography variant="body2">{loggedInUser.email}</Typography>
          </div>
        </div>
        <div className={classes.adminHeaderContainer}>
          <AdminHeader />
        </div>
        <div className={classes.tableContainer}>
          <UserTable />
        </div>
        <div className={classes.footer}>
        <Footer currentPage={1} totalPages={2} totalRecords={4} currentPageRecords={4} />
      </div>
      </div>
    </div>
  );
} 
export default AdminPage;
