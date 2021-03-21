import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      textAlign: 'right',
    },
    icon: {
      marginRight: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
  })
);

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Box className={classes.icon}>
        <a
          href="https://github.com/yokotani92/dp-visualizer"
          className={classes.link}
        >
          <GitHubIcon />
        </a>
      </Box>
    </footer>
  );
};

export default Footer;
