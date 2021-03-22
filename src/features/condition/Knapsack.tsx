import React, { useCallback, useContext, useMemo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box, Card, Slider, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import conditionSlice, { ConditionState } from './conditionSlice';
import { RootState } from '../../utils/store';
import tableSlice from '../dpTable/tableSlice';
import { SizeContext } from '../../component/App';

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      marginRight: '16px',
    },
  })
);

const Knapsack: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const condition = useSelector<RootState, ConditionState>(
    (state) => state.condition
  );
  const { isMobile } = useContext(SizeContext);

  const marks = useMemo(
    () =>
      Array(11)
        .fill(0)
        .map((_, i) => {
          return {
            value: i,
            label: i.toString(),
          };
        }),
    []
  );

  const handleChange = useCallback(
    (value: number | number[]) => {
      if (typeof value === 'object') return;
      dispatch(conditionSlice.actions.setCapacity(value));
      dispatch(conditionSlice.actions.setEval('BEFORE'));
      dispatch(tableSlice.actions.resetTable());
    },
    [dispatch]
  );

  return (
    <Card>
      <Box p={isMobile ? 2 : 3}>
        <Grid container spacing={2}>
          <Grid item xl={1} sm={1} xs={2}>
            <Box className={classes.icon}>
              <ShoppingBasketOutlinedIcon />
            </Box>
          </Grid>
          <Grid item xl={11} sm={11} xs={10}>
            <Typography variant="h5" gutterBottom>
              ナップサックの容量
            </Typography>
            <Box pr={2}>
              <Slider
                defaultValue={10}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks={marks}
                min={0}
                max={10}
                disabled={
                  condition.eval !== 'BEFORE' && condition.eval !== 'COMPLETE'
                }
                onChange={(_, value) => handleChange(value)}
              />
            </Box>
          </Grid>
        </Grid>{' '}
      </Box>
    </Card>
  );
};

export default Knapsack;
