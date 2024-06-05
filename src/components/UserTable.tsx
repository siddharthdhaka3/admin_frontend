// UserTable.tsx
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useAppSelector } from "../store/store";
import { RootState } from '../store/store';
import { useAppDispatch } from "../store/store";
import { updateUserStatus, deleteUser } from '../store/userSlice'; 
import { useUpdateUserStatusMutation, useDeleteUserMutation } from '../services/api'; // Import mutation hooks

interface User {
  _id: string;
  name: string;
  email: string;
  blocked: boolean;
}

interface UserTableProps {
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      marginTop: theme.spacing(2),
    },
    headerCell: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontWeight: 'bold',
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    actionButton: {
      marginRight: theme.spacing(1),
    },
  }),
);

const UserTable: React.FC<UserTableProps> = () => {
  const users = useAppSelector((state: RootState) => state.user.users);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  // const token = useAppSelector((state: RootState)=> state.auth.accessToken); 

  const [updateUserStatusMutation] = useUpdateUserStatusMutation(); // Mutation hook for updating user status
  const [deleteUserMutation] = useDeleteUserMutation(); // Mutation hook for deleting user

  const handleToggleUserStatus = async (id: string, blocked: boolean) => {
    try {
      const response = await updateUserStatusMutation({ id, blocked: !blocked }); // Use mutation hook to update user status
      if ('data' in response && response.data) {
        // Update the user status in the Redux store
        dispatch(updateUserStatus({ id: id, blocked: !blocked }));
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await deleteUserMutation(id); // Use mutation hook to delete user
      if ('data' in response && response.data) {
        // Remove the user from the Redux store
        dispatch(deleteUser(id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <Typography variant="h3">All Users:</Typography>
      <Table className={classes.table} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell}>ID</TableCell>
            <TableCell className={classes.headerCell}>Email</TableCell>
            <TableCell className={classes.headerCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} className={classes.tableRow}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleToggleUserStatus(user._id, user.blocked)}
                  className={classes.actionButton}
                  variant="contained"
                  color={user.blocked ? 'primary' : 'secondary'}
                >
                  {user.blocked ? 'Enable' : 'Disable'}
                </Button>
                <Button
                  onClick={() => handleDeleteUser(user._id)}
                  className={classes.actionButton}
                  variant="contained"
                  color="default"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserTable;
