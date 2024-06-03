import { Box, Theme, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createStyles } from "@mui/styles";

const useStyle = (theme: Theme) => createStyles({
  root: {
    backgroundColor: "#f0f0f0", // Light grey
    height: '100vh',
    width: '100vw',
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'lightgrey',
    },
  },
});

const Basic: React.FC = () => {
  const theme = useTheme();
  const styles = useStyle(theme);
  return (
    <Box sx={styles.root}>
      <Outlet />
    </Box>
  );
};

export default Basic;
