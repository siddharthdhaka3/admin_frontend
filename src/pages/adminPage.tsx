import React, { useEffect } from 'react';
import { useAppDispatch } from "../store/store";
import { addUser } from '../store/userSlice'; 
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AdminHeader from '../components/AdminHeader';
import UserTable from '../components/UserTable';
import SideMenu from '../components/SideMenu';
import { useGetAllUsersQuery } from '../services/api';
import Footer from '../components/AdminFooter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
      width: "100%",
      display: 'flex',
      margin: 0,
    },
    content: {
      flexGrow: 1,
      backgroundColor: 'rgba(178, 178, 178, 0.5)',
      minHeight: '100vh',
      position: 'relative',
    },
    formContainer: {
      marginBottom: theme.spacing(2),
      margin: 0,
    },
    tableContainer: {
      backgroundColor: '#fff',
      borderRadius: theme.spacing(5),
      overflow: 'hidden',
      border: 'none',
    },
    emptyDiv: {
      backgroundColor: 'white',
      width: '100%',
      height: '86px',
      position: 'relative',
    },
    userDetails: {
      position: 'absolute',
      width: '200px',
      height: '51px',
      top: '17px',
      left: '984px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: '10px',
      alignItems: 'flex-start',
      padding: theme.spacing(1),
      backgroundColor: 'white',
      borderRadius: '8px',
    },
    userName: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '13px',
    },
    userEmail: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 300,
      fontSize: '12px',
      lineHeight: '20px',
    },
    adminHeaderContainer: {
      marginTop: '10px',
      marginLeft: '10px',
    },
    footer: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      marginTop: 'auto',
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

  const { data: allUsers = [], isSuccess } = useGetAllUsersQuery();

  useEffect(() => {
    if (isSuccess) {
      allUsers.forEach(user => {
        dispatch(addUser(user));
      });
    }
  }, [dispatch, allUsers, isSuccess]);

  const loggedInUser = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className={classes.root}>
      <SideMenu />
      <div className={classes.content}>
        <div className={classes.emptyDiv}>
          <div className={classes.userDetails}>
            <Typography variant="body1" className={classes.userName}>{loggedInUser.name}</Typography>
            <Typography variant="body2" className={classes.userEmail}>{loggedInUser.email}</Typography>
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
