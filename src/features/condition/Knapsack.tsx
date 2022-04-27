import React, { useCallback, useContext, useMemo } from 'react';
import { Box, Card, Slider, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import conditionSlice, { ConditionState } from './conditionSlice';
import { RootState } from '../../utils/store';
import tableSlice from '../dpTable/tableSlice';
import { SizeContext } from '../../component/App';

const Knapsack: React.FC = () => {
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
        <Box display="flex" alignItems="center">
          <Box mr={isMobile ? 2 : 3}>
            <ShoppingBasketOutlinedIcon />
          </Box>
          <Box flexGrow={1}>
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
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Knapsack;
