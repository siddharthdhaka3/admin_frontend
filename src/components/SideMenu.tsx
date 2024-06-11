import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import GridViewIcon from '@mui/icons-material/GridView'; // Import the GridViewIcon
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#fff',
    },
    logo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 64,
      backgroundColor: '#fff',
      borderBottom: '1px solid #ccc',
    },
    logoText: {
      color: 'rgba(27, 68, 88, 0.7)',
      fontWeight: 'bold',
      fontSize: '1.5rem', // Increase font size of top icon
    },
    listItemText: {
      // textAlign: 'center',
      color: 'rgba(27, 68, 88, 0.7)',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      padding: 0, // Remove padding from list item
    },
    icon: {
      color: 'rgba(27, 68, 88, 0.7)', // Set the color of the icons to #1B4458 with 70% opacity
      minWidth: 40, // Set a minimum width for the icon container
      display: 'flex',
      justifyContent: 'center',
      marginRight: theme.spacing(1), // Add margin to the right of the icon
    },
    logoImage: {
      width: 40, // Set the width of the logo image
      height: 'auto', // Maintain aspect ratio
    },
  }),
);

interface SideMenuProps {
  // Add any props you need
}

const SideMenu: React.FC<SideMenuProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.logo}>
          {/* Use img tag with src attribute pointing to the logo image */}
          <Typography variant="h6" className={classes.logoText}>
            <img src="https://github.com/siddharthdhaka3/admin_frontend/blob/main/public/logoIcon.png" alt="Logo" className={classes.logoImage} />
          </Typography>
        </div>
        <List>
          <ListItem button dense className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <GridViewIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem button dense className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <PersonAddAltIcon />
            </ListItemIcon>
            <ListItemText primary="User" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem button dense className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem button dense className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" classes={{ primary: classes.listItemText }} />
          </ListItem>
        </List>
      </Drawer>
      {/* Content goes here */}
    </div>
  );
}

export default SideMenu;
