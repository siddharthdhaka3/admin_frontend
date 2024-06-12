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
      height: '53px',
      paddingLeft: '25px',
      backgroundColor: 'white',
      borderTop: '1px solid #ccc',
      position: 'relative',
    },
    leftContent: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '14.52px',
    },
    pageMover: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      left: '939px',
      width: '195px',
      height: '25px',
      justifyContent: 'space-between',
      padding: '0 10px',
    },
    customText: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '14.52px',
      whiteSpace: 'nowrap',
    },
    pageText: {
      fontSize: '10px', // Setting the font size of the "Page" text to 10px
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
      lineHeight: '14.52px',
      whiteSpace: 'nowrap',
    },
    pageBox: {
      width: '31px',
      height: '25px',
      border: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '10px',
      marginRight: '10px',
    },
    navigatorBoxText: {
      fontSize: '10px', // Setting the font size of the text inside the box to 10px
    },
    navigatorIcon: {
      color: '#00ADEF',
    },
  })
);

interface FooterProps {
  currentPage: number;
  totalPages: number;
  currentPageRecords: number;
  totalRecords: number;
}

const Footer: React.FC<FooterProps> = ({
  currentPage = 1,
  totalPages = 2,
  totalRecords = 4,
  currentPageRecords = 4,
}) => {
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
        <Typography variant="body1" className={classes.customText}>
          Showing {currentPageRecords} of {totalRecords} records
        </Typography>
      </div>
      <div className={classes.pageMover}>
        <IconButton
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className={classes.navigatorIcon}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="body1" className={classes.pageText}>
          Page
        </Typography>
        <div className={classes.pageBox}>
          <Typography variant="body1" className={`${classes.customText} ${classes.navigatorBoxText}`}>
            {currentPage}
          </Typography>
        </div>
        <Typography variant="body1" className={classes.customText}>
          of {totalPages}
        </Typography>
        <IconButton
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className={classes.navigatorIcon}
        >
          <NavigateNextIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Footer;
