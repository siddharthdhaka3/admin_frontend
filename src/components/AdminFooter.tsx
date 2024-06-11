import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(0),
      backgroundColor: 'white',
      borderTop: '1px solid #ccc',
    },
    leftContent: {
      display: 'flex',
      alignItems: 'center',
    },
    pageIndicator: {
      marginRight: theme.spacing(2),
    },
    pageMover: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

interface FooterProps {
  currentPage: number;
  totalPages: number;
  currentPageRecords:number;
  totalRecords: number;
}

const Footer: React.FC<FooterProps> = ({ currentPage = 1, totalPages = 2, totalRecords = 4,  currentPageRecords = 4}) => {
  const classes = useStyles();

  function onNextPage() {
    // Implement logic for moving to the next page
  }

  function onPreviousPage() {
    // Implement logic for moving to the previous page
  }

  return (
    <div className={classes.root}>
      <div className={classes.leftContent}>
        <Typography variant="body1">
          Showing {currentPageRecords} of {totalRecords} records
        </Typography>
      </div>
      <div className={classes.pageMover}>
        <IconButton onClick={onPreviousPage} disabled={currentPage === 1}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="body1">
          Page {currentPage} of {totalPages}
        </Typography>
        <IconButton onClick={onNextPage} disabled={currentPage === totalPages}>
          <NavigateNextIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Footer;
