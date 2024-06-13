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
import { Link } from 'react-router-dom';
import Log1 from '../assets/newLogo.png';

const drawerWidth = 250;

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
      margin: '8px',
      borderTopRightRadius: '30px', // Curved top-right corner
    },
    logo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: '30px',
    },
    logoText: {
      color: 'rgba(27, 68, 88, 0.7)',
    },
    listItemText: {
      color: 'rgba(27, 68, 88, 0.7)',
      paddingTop: '15px',
      paddingBottom: '15px',
      paddingLeft: '12px',
      fontFamily: 'Red Hat Display, sans-serif',
      fontSize: '16px',
      lineHeight: '21.17px',
      letterSpacing: '0.02em',
    },
    listItem: {
      paddingTop: '30px',
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      paddingLeft: '35px',
      height: '56px',
      width: '248px',
    },
    icon: {
      color: 'rgba(27, 68, 88, 0.7)',
      minWidth: 30,
      minHeight: 30,
      display: 'flex',
      justifyContent: 'center',
    },
    logoImage: {
      width: '77px',
      height: '75px',
    },
    link: {
      textDecoration: 'none',
    },
  })
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
      >
        <div className={classes.logo}>
          <Typography variant="h6" className={classes.logoText}>
            <img src={Log1} alt="Logo" className={classes.logoImage} />
          </Typography>
        </div>
        <List>
          <Link to="/dashboard" className={classes.link}>
            <ListItem button dense className={classes.listItem}>
              <ListItemIcon className={classes.icon}>
                <GridViewIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" classes={{ primary: classes.listItemText }} />
            </ListItem>
          </Link>
          <Link to="/add-user" className={classes.link}>
            <ListItem button dense className={classes.listItem}>
              <ListItemIcon className={classes.icon}>
                <PersonAddAltIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="User" classes={{ primary: classes.listItemText }} />
            </ListItem>
          </Link>
          <Link to="/settings" className={classes.link}>
            <ListItem button dense className={classes.listItem}>
              <ListItemIcon className={classes.icon}>
                <SettingsIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Settings" classes={{ primary: classes.listItemText }} />
            </ListItem>
          </Link>
          <Link to="/logout" className={classes.link}>
            <ListItem button dense className={classes.listItem}>
              <ListItemIcon className={classes.icon}>
                <LogoutIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Logout" classes={{ primary: classes.listItemText }} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      {/* Content goes here */}
    </div>
  );
}

export default SideMenu;
