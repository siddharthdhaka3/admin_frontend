// AdminHeader.tsx
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    marginBottom: theme.spacing(2),
    fontSize: '2rem',
    fontWeight: 'bold',
  },
}));

const AdminHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <Typography variant="h2" className={classes.header}>
      Admin Page
    </Typography>
  );
};

export default AdminHeader;
