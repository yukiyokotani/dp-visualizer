import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ThemeSwitch from '../features/theme/ThemeSwitch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(3),
    },
    title: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(4),
    },
    menu: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'flex-end',
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} color="transparent">
        <ToolBar>
          <ViewComfyIcon />
          {!isMobile && (
            <Typography variant="h4" className={classes.title}>
              DP VISUALISER
            </Typography>
          )}
          <div className={classes.menu}>
            <ThemeSwitch />
          </div>
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default Header;
