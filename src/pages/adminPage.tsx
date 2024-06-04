import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../store/store";
import { RootState } from '../store/store';
import { addUser, updateUserStatus, deleteUser } from '../store/userSlice'; 
import axios from "axios";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@mui/icons-material/Delete';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    header: {
      marginBottom: theme.spacing(2),
      fontSize: '2rem', 
      fontWeight: 'bold',
    },
    table: {
      marginTop: theme.spacing(2),
      minWidth: 650,
    },
    tableHeader: {
      backgroundColor: theme.palette.primary.main,
    },
    tableHeaderText: {
      color: theme.palette.common.white,
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    formContainer: {
      marginBottom: theme.spacing(2),
    },
    formField: {
      marginRight: theme.spacing(2),
    },
    formNote: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
      textAlign: 'right',
    },
    sectionTitle: {
      fontSize: '1.5rem', // Adjust font size
      fontWeight: 'bold',
      marginBottom: theme.spacing(2),
    },
    disableButton: {
      backgroundColor: 'red',
      color: 'white',
      '&:hover': {
        backgroundColor: 'darkred',
      },
    },
    disabledButton: {
      backgroundColor: 'grey',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: 'red',
      color: 'white',
      '&:hover': {
        backgroundColor: 'darkred',
      },
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

  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // For now, we'll just clear the form fields
    setEmail('');
    setRole('');
  };

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
        console.log("once");
        
        response.data.forEach(user => {
          dispatch(addUser(user));
        });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []); // Empty dependency array to run effect only once
  

  const handleToggleUserStatus = async (id: string, blocked: boolean) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/user/${id}`, { blocked: !blocked }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        // Update the user status in the Redux store
        dispatch(updateUserStatus({ userId: id, blocked: !blocked }));
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        // Remove the user from the Redux store
        dispatch(deleteUser(id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.header}>Admin Page</Typography>
      <Typography variant="body1" className={classes.formNote}>Add new user through email:</Typography>
      <Grid container className={classes.formContainer}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Role"
                variant="outlined"
                value={role}
                onChange={handleRoleChange}
                fullWidth
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <div>
        <Typography variant="h3" className={classes.sectionTitle}>All Users:</Typography>
        <Table className={classes.table} aria-label="users table">
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell className={classes.tableHeaderText}>ID</TableCell>
              <TableCell className={classes.tableHeaderText}>Email</TableCell>
              <TableCell className={classes.tableHeaderText}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((user: User) => (
              <TableRow key={user._id} className={classes.tableRow}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleToggleUserStatus(user._id, user.blocked)}
                    className={user.blocked ? classes.disabledButton : classes.disableButton}
                  >
                    {user.blocked ? 'Enable' : 'Disable'}
                  </Button>
                  <Button
                    onClick={() => handleDeleteUser(user._id)}
                    className={classes.deleteButton}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
