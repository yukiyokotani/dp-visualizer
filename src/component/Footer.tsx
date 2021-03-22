import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'right',
    },
    icon: {
      margin: '8px 16px 16px 0px',
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
