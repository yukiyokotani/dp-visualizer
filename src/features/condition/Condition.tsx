import {
  Box,
  Card,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import { RootState } from '../../utils/store';
import conditionSlice, { ConditionState } from './conditionSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonBox: {
      margin: '4px 4px 4px 12px',
    },
    itemCard: {
      width: '100%',
      display: 'flex',
    },
  })
);

const Condition: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const condition = useSelector<RootState, ConditionState>(
    (state) => state.condition
  );

  const { items } = condition;

  const deleteItem = useCallback(
    (index: number) => {
      dispatch(conditionSlice.actions.delItem(index));
      enqueueSnackbar('アイテムを削除しました。', { variant: 'success' });
    },
    [dispatch, enqueueSnackbar]
  );

  return (
    <Card>
      <Box p={3}>
        <Grid container spacing={2}>
          {items.map((item, index) => {
            return (
              <Grid
                item
                xl={6}
                md={6}
                sm={12}
                xs={12}
                container // eslint-disable-next-line react/no-array-index-key
                key={`${item.weight}-${item.worth}-${index}`}
              >
                <Card variant="outlined" className={classes.itemCard}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5">{`Item ${index + 1}`}</Typography>
                  </Box>
                  <Box flexGrow={1} display="flex" alignItems="center">
                    <Grid container spacing={2}>
                      <Grid item xl={6} xs={6}>
                        <Typography variant="body1">{item.weight}</Typography>
                      </Grid>
                      <Grid item xl={6} xs={6}>
                        <Typography variant="body1">{item.worth}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className={classes.buttonBox}>
                    <IconButton
                      color="secondary"
                      onClick={() => deleteItem(index)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Card>
  );
};

export default Condition;
