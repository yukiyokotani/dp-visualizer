import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ThemeSwitch from '../features/theme/ThemeSwitch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
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

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} color="transparent">
        <ToolBar>
          <ViewComfyIcon />
          <Typography variant="h4" className={classes.title}>
            DP Table Visualizer
          </Typography>
          <div className={classes.menu}>
            <ThemeSwitch />
          </div>
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default Header;
