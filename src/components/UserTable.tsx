import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useAppSelector } from "../store/store";
import { RootState } from '../store/store';
import { useAppDispatch } from "../store/store";
import { updateUserStatus, deleteUser } from '../store/userSlice';
import { useUpdateUserStatusMutation, useDeleteUserMutation } from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  blocked: boolean;
}

interface UserTableProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      borderRadius: 20,
      overflow: 'hidden',
      boxShadow: theme.shadows[1],
      paddingLeft: '40px',
      backgroundColor: 'rgba(178, 178, 178, 0.5)',
    },
    table: {
      width: '1085px',
      borderCollapse: 'separate',
      borderSpacing: 0,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingLeft: '30px',
      paddingRight: '30px',

    },
    headerCell: {
      backgroundColor: '#FFFFFF',
      color: '#667085',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '18px',
      textAlign:'left',
      paddingLeft: '0px',
      paddingTop:'25px',
      paddingBottom:'25px',

    },
    tableRow: {
      '&:last-child td:first-child': {
        borderBottomLeftRadius: 10,
      },
      '&:last-child td:last-child': {
        borderBottomRightRadius: 10,
      },
      '& td': {
        borderBottom: 'none',
      },
    },
    moreIcon: {
      cursor: 'pointer',
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    tableCellText: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '16.94px',
      textAlign: 'left',
      paddingLeft: '0px',
      paddingTop: '12px',
    },
  }),
);

const UserTable: React.FC<UserTableProps> = () => {
  const users = useAppSelector((state: RootState) => state.user.users);
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [updateUserStatusMutation] = useUpdateUserStatusMutation();
  const [deleteUserMutation] = useDeleteUserMutation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleToggleUserStatus = async () => {
    if (selectedUser) {
      try {
        const response = await updateUserStatusMutation({ id: selectedUser._id, blocked: !selectedUser.blocked });
        if ('data' in response && response.data) {
          dispatch(updateUserStatus({ id: selectedUser._id, blocked: !selectedUser.blocked }));
        }
      } catch (error) {
        console.error('Error toggling user status:', error);
      }
    }
    handleMenuClose();
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        const response = await deleteUserMutation(selectedUser._id);
        if ('data' in response && response.data) {
          dispatch(deleteUser(selectedUser._id));
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
    handleMenuClose();
  };

  return (
    <>
      <div className={classes.tableContainer}>
        <Table className={classes.table} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Name</TableCell>
              <TableCell className={classes.headerCell}>Email Address</TableCell>
              <TableCell className={classes.headerCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} className={classes.tableRow}>
                <TableCell className={classes.tableCellText}>{user.name}</TableCell>
                <TableCell className={classes.tableCellText}>{user.email}</TableCell>
                <TableCell className={classes.tableCellText}>
                  <IconButton
                    aria-controls="action-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, user)}
                    className={classes.moreIcon}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="action-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleToggleUserStatus}>
                      {selectedUser?.blocked ? 'Enable' : 'Disable'}
                    </MenuItem>
                    <MenuItem onClick={handleDeleteUser}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UserTable;
