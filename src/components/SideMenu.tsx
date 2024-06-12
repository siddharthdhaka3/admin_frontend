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
      margin:'8px',
      //border: '1px solid #ccc', // Add border to the drawer
      borderTopRightRadius: '30px', // Curved top-right corner
    },
    logo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // height: 100, // Increase the height of the logo container
      backgroundColor: '#fff',
      paddingTop:'30px',
      // paddingLeft:'86px',
    },
    logoText: {
      color: 'rgba(27, 68, 88, 0.7)',
     // Increase font size of top icon
    },
    listItemText: {
      //textAlign: 'center',
      color: 'rgba(27, 68, 88, 0.7)',
      paddingTop:'15px',
      paddingBottom:'15px',
      paddingLeft:'12px',
      fontFamily: 'Red Hat Display, sans-serif', // Set the font family
      //fontWeight: 500, // Set the font weight
      fontSize: '16px', // Set the font size
      lineHeight: '21.17px', // Set the line height
      letterSpacing: '0.02em', 
      
    },
    listItem: {
      paddingTop: '30px', // Add top padding of 28px

      display: 'flex',
      alignItems: 'center',
      padding: 0, // Increase padding top and bottom of list item
      paddingLeft:'35px',
      height:'56px',
      width:'248px',
      
    },
    
    icon: {
      color: 'rgba(27, 68, 88, 0.7)', // Set the color of the icons to #1B4458 with 70% opacity
      minWidth: 30,
      minHeight:30, // Set a minimum width for the icon container
      display: 'flex',
      justifyContent: 'center',
      // marginRight: theme.spacing(1), // Add margin to the right of the icon
    },
    logoImage: {
      
      width: '77px',
      height:'75px', // Increase the width of the logo image
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
        // anchor="left"
      >
        <div className={classes.logo}>
          {/* Use img tag with src attribute pointing to the logo image */}
          <Typography variant="h6" className={classes.logoText}>
            <img src={Log1} alt="Logo" className={classes.logoImage} />
          </Typography>
        </div>
        <List>
          <ListItem button dense className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <GridViewIcon fontSize='large'/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem button dense className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <PersonAddAltIcon fontSize='large' />
            </ListItemIcon>
            <ListItemText primary="User" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem button dense className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <SettingsIcon fontSize='large'/>
            </ListItemIcon>
            <ListItemText primary="Settings" classes={{ primary: classes.listItemText }} />
          </ListItem>
          <ListItem button dense className={classes.listItem}>
            <ListItemIcon className={classes.icon}>
              <LogoutIcon fontSize='large'/>
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
