import { Box, Card, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store';
import { ConditionState } from './conditionSlice';

const Evaluation: React.FC = () => {
  const condition = useSelector<RootState, ConditionState>(
    (state) => state.condition
  );

  let comment;
  switch (condition.eval) {
    case 'BEFORE':
      comment = '実行前です。';
      break;
    case 'OVER':
      comment = 'アイテムがナップサックに入りません。';
      break;
    case 'LOSS':
      comment = 'アイテムをナップサックに入れると損です。';
      break;
    case 'PROFIT':
      comment = 'アイテムをナップサックに入れると得です。';
      break;
    case 'COMPLETE':
      comment = `ナップサックに詰められる価値は最大で${condition.maxWorth}です。`;
      break;
    default:
      comment = '';
  }

  return (
    <Card>
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xl={12} xs={12}>
            <Typography variant="body1">{comment}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default Evaluation;
