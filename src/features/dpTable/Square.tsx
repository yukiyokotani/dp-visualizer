import {
  Chip,
  createStyles,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
    chipItem: {
      margin: theme.spacing(0.5),
    },
  })
);

const Square: React.FC<Status> = ({
  worth,
  isInProcess,
  isProcessed,
  isReffered,
  isBasis,
  includedItems,
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
    <Tooltip
      title={
        // eslint-disable-next-line no-nested-ternary
        isProcessed
          ? includedItems.length === 0
            ? ''
            : includedItems.map((item) => (
                <div className={classes.chipItem}>
                  <Chip
                    icon={<CheckCircleIcon />}
                    label={`重さ: ${item.weight}, 価値: ${item.worth}`}
                    color="primary"
                  />
                </div>
              ))
          : ''
      }
    >
      <td className={`${className} ${classes.tableTd}`}>
        <Typography variant="body1">
          {isProcessed ? worth.toString() : ''}
        </Typography>
      </td>
    </Tooltip>
  );
};

export default Square;
