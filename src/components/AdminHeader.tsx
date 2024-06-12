import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    marginBottom: '36px',
    fontSize: '2rem',
    fontWeight: 'bold',
    fontFamily: 'Red Hat Display', // Set font family to Red Hat Display
    color: '#1B4458', // Set text color to #1B4458
    marginLeft: '38px', 
    marginTop: '36px', // Add margin to the left
    // Add margin to the left
  },
  mainText: {
    fontSize: '22px', // Set font size to 22px
    fontWeight: 700, // Set font weight to 700
    lineHeight: '29.11px', // Set line height to 29.11px
  },
}));
const AdminHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h2" className={classes.header}>
        Admin Page
      </Typography>
      
    </>
  );
};

export default AdminHeader;
