import {
  Box,
  Chip,
  createStyles,
  Divider,
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
      overflow: 'auto',
    },
    chipItem: {
      marginBottom: theme.spacing(0.5),
    },
    chipSummary: {
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
        isProcessed ? (
          includedItems.length === 0 ? (
            <Typography variant="body2" align="center">
              空です
            </Typography>
          ) : (
            <>
              <Box pt="4px" pb="2px">
                {includedItems.map((item) => (
                  <div className={classes.chipItem} key={item.id}>
                    <Chip
                      icon={<CheckCircleIcon />}
                      label={`重さ: ${item.weight}, 価値: ${item.worth}`}
                      color="primary"
                    />
                  </div>
                ))}{' '}
              </Box>
              <Divider />
              <div className={classes.chipSummary}>
                <Typography
                  variant="body2"
                  align="center"
                >{`重さ: ${includedItems.reduce(
                  (acc, cur) => acc + cur.weight,
                  0
                )}, 価値: ${includedItems.reduce(
                  (acc, cur) => acc + cur.worth,
                  0
                )}`}</Typography>
              </div>
            </>
          )
        ) : (
          ''
        )
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
