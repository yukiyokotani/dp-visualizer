import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { Status } from './tableSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    isInProcess: {
      backgroundColor: theme.palette.action.disabledBackground,
    },
    isProcessed: {
      backgroundColor: theme.palette.action.hover,
    },
    isReffered: {
      backgroundColor: theme.palette.action.selected,
    },
    isBasis: {
      backgroundColor: theme.palette.action.selected,
    },
    tableTd: {
      border: `1px solid ${theme.palette.divider}`,
      textAlign: 'center',
    },
  })
);

const Square: React.FC<Status> = ({
  worth,
  isInProcess,
  isProcessed,
  isReffered,
  isBasis,
}) => {
  const classes = useStyles();
  const className = useMemo(() => {
    if (isInProcess) {
      return classes.isInProcess;
    }
    if (isReffered) {
      return classes.isReffered;
    }
    if (isBasis) {
      return classes.isBasis;
    }
    if (isProcessed) {
      return classes.isProcessed;
    }
    return '';
  }, [
    classes.isBasis,
    classes.isInProcess,
    classes.isProcessed,
    classes.isReffered,
    isBasis,
    isInProcess,
    isProcessed,
    isReffered,
  ]);
  return (
    <td className={`${className} ${classes.tableTd}`}>
      <Typography variant="body1">
        {isProcessed ? worth.toString() : ''}
      </Typography>
    </td>
  );
};

export default Square;
