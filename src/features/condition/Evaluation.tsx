import { Box, Paper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { RootState } from '../../utils/store';
import { ConditionState } from './conditionSlice';
import { SizeContext } from '../../component/App';

const Evaluation: React.FC = () => {
  const condition = useSelector<RootState, ConditionState>(
    (state) => state.condition
  );
  const { isMobile } = useContext(SizeContext);

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
    <Paper>
      <Box p={isMobile ? 2 : 3}>
        <Box display="flex" alignItems="center">
          <Box mr={isMobile ? 2 : 3}>
            <InfoOutlinedIcon />
          </Box>
          <Box flexGrow={1}>
            <Typography variant="body1">{comment}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Evaluation;
