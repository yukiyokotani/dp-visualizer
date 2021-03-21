import React, { useCallback } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Paper, Chip, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import Square from './Square';
import tableSlice, { Status, Coordiante } from './tableSlice';
import { RootState } from '../../utils/store';
import conditionSlice, {
  Eval,
  ConditionState,
  Item,
} from '../condition/conditionSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperTitle: {
      marginLeft: theme.spacing(1),
    },
    dpTable: {
      width: '100%',
      tableLayout: 'fixed',
      borderCollapse: 'collapse',
    },
    buttons: {
      marginTop: theme.spacing(2),
      '& > *': {
        marginLeft: theme.spacing(3),
      },
    },
    trData: {
      height: '50px',
    },
    thIndex: {
      width: '200px',
      overflow: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: '100px',
      },
    },
    thColumn: {
      height: '50px',
      width: 'calc((100% - 200px)/11)',
      minWidth: 'calc((100% - 200px)/11)',
      maxWidth: 'calc((100% - 200px)/11)',
      [theme.breakpoints.down('sm')]: {
        width: 'calc((100% - 100px)/11)',
        minWidth: 'calc((100% - 100px)/11)',
        maxWidth: 'calc((100% - 100px)/11)',
      },
    },
    tableLabel: {
      marginLeft: 'calc(200px + (50% - 200px))',
    },
    emptyChip: {
      paddingLeft: '2.5rem',
      paddingRight: '2.5rem',
    },
    itemChip: {
      animationName: '$fadeIn',
      animationDuration: '.3s',
      animationTimingFunction: 'ease-in-out',
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },
  })
);

const DpTable: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // state
  const table = useSelector<RootState, Status[][]>((state) => state.table);
  const condition = useSelector<RootState, ConditionState>(
    (state) => state.condition
  );

  const { capacity, items } = condition;

  // method
  const updateMaxWorth = useCallback(
    (newMaxworth: number) => {
      dispatch(conditionSlice.actions.setMaxWorth(newMaxworth));
    },
    [dispatch]
  );

  const updateEval = useCallback(
    (newEval: Eval) => {
      dispatch(conditionSlice.actions.setEval(newEval));
    },
    [dispatch]
  );

  const updateProcessed = useCallback(
    (newProcessed: { index: number; isProcessed: boolean }) => {
      dispatch(conditionSlice.actions.setProcessed(newProcessed));
    },
    [dispatch]
  );

  const updateTable = useCallback(
    (newTable: Status[][]) => {
      dispatch(tableSlice.actions.setTable(newTable));
    },
    [dispatch]
  );

  const resetCondition = useCallback(() => {
    dispatch(conditionSlice.actions.resetCondition());
  }, [dispatch]);

  const resetTable = useCallback(() => {
    dispatch(tableSlice.actions.resetTable());
  }, [dispatch]);

  const handleDelete = useCallback(
    (item: Item) => {
      dispatch(conditionSlice.actions.delItem(item));
      dispatch(conditionSlice.actions.setEval('BEFORE'));
      resetTable();
      enqueueSnackbar('アイテムを削除しました。', { variant: 'success' });
    },
    [dispatch, enqueueSnackbar, resetTable]
  );

  /**
   * 再帰的にdp tableを更新する関数
   * @param prevTable 一つ前のイテレーションで更新されたdp table
   * @param interval 更新のインターバル (ms)
   * @param prevCurr 一つ前のイテレーションで更新したマスの座標
   * @param prevPrev 一つ前のイテレーションから見た一つ前のイテレーションで更新したマスの座標
   * @param prevRef 一つ前のイテレーションで残分埋めに参照したマスの座標
   * @param prevBasis 一つ前のイテレーションで総価値の比較に参照したマスの座標
   */
  const recUpdate = useCallback(
    (
      prevTable: Status[][],
      interval: number,
      prevCurr: Coordiante,
      prevPrev: Coordiante,
      prevRef: Coordiante,
      prevBasis: Coordiante
    ) => {
      if (prevCurr.i === items.length) {
        updateMaxWorth(prevTable[prevPrev.i][prevPrev.j].worth);
        updateEval('COMPLETE');
        return;
      }
      // 更新用に新しいテーブルを作成
      const newTable: Status[][] = [[]];
      prevTable.forEach((row, i) => {
        newTable[i] = row.slice();
      });
      // 次のイテレーション用に引数をコピー
      const newCurr = { ...prevCurr };
      const newPrev = { ...prevPrev };
      let newRef = { ...prevRef };
      let newBasis = { ...prevBasis };

      // Conditionの更新
      updateProcessed({ index: prevCurr.i, isProcessed: true });

      // ひとつ前の処理のハイライトの初期化
      newTable[prevPrev.i][prevPrev.j] = {
        ...newTable[prevPrev.i][prevPrev.j],
        isInProcess: false,
      };
      newTable[prevRef.i][prevRef.j] = {
        ...newTable[prevRef.i][prevRef.j],
        isReffered: false,
      };
      newTable[prevBasis.i][prevBasis.j] = {
        ...newTable[prevBasis.i][prevBasis.j],
        isBasis: false,
      };

      // 評価
      let newWorth = 0;
      const includedItems = [];
      // itemがknapsackに入る場合
      if (prevCurr.j >= items[prevCurr.i].weight) {
        newRef = {
          i: prevCurr.i,
          j: prevCurr.j - items[prevCurr.i].weight,
        };
        newTable[newRef.i][newRef.j] = {
          ...newTable[newRef.i][newRef.j],
          isReffered: true,
        };
        newBasis = { i: prevCurr.i, j: prevCurr.j };
        newTable[newBasis.i][newBasis.j] = {
          ...newTable[newBasis.i][newBasis.j],
          isBasis: true,
        };
        // itemをknapsackに入れるべきか評価する
        if (
          newTable[prevCurr.i][prevCurr.j - items[prevCurr.i].weight].worth +
            items[prevCurr.i].worth >=
          newTable[prevCurr.i][prevCurr.j].worth
        ) {
          // itemをknapsackに入れたほうが得な場合
          newWorth =
            newTable[prevCurr.i][prevCurr.j - items[prevCurr.i].weight].worth +
            items[prevCurr.i].worth;
          includedItems.push(
            ...newTable[prevCurr.i][prevCurr.j - items[prevCurr.i].weight]
              .includedItems,
            items[prevCurr.i]
          );
          updateEval('PROFIT');
        } else {
          // itemをknapsackに入れると損な場合
          newWorth = newTable[prevCurr.i][prevCurr.j].worth;
          includedItems.push(...newTable[prevCurr.i][prevCurr.j].includedItems);
          updateEval('LOSS');
        } // itemがknapsackに入らない場合
      } else {
        newWorth = newTable[prevCurr.i][prevCurr.j].worth;
        includedItems.push(...newTable[prevCurr.i][prevCurr.j].includedItems);
        updateEval('OVER');
      }
      // 評価結果をもとにtableを更新
      newTable[prevCurr.i + 1][prevCurr.j] = {
        worth: newWorth,
        isInProcess: true,
        isProcessed: true,
        isReffered: false,
        isBasis: false,
        includedItems,
      };
      updateTable(newTable);

      // 次のマスへindexを更新
      newPrev.i = prevCurr.i + 1;
      newPrev.j = prevCurr.j;
      newCurr.j = prevCurr.j + 1;
      if (newCurr.j === capacity + 1) {
        newCurr.j = 0;
        newCurr.i += 1;
      }

      setTimeout(
        () => recUpdate(newTable, interval, newCurr, newPrev, newRef, newBasis),
        interval
      );
    },
    [capacity, items, updateEval, updateProcessed, updateMaxWorth, updateTable]
  );

  // isInProcessのマスを0.1sec毎に走査する関数
  const scanTable = useCallback(() => {
    // 再帰関数の引数の初期値
    const intervalTime = 300;
    const currCoord = { i: 0, j: 0 };
    const prevCoord = { i: items.length, j: capacity };
    const refCoord = { i: 0, j: 0 }; // アイテムを入れたあまりを最適化するボックス
    const basisCoord = { i: 0, j: 0 }; // 一つ左のボックス

    const newTable: Status[][] = [[]];
    table.forEach((row, i) => {
      newTable[i] = table[i].slice();
    });

    // 再帰関数の呼び出し
    recUpdate(
      newTable,
      intervalTime,
      currCoord,
      prevCoord,
      refCoord,
      basisCoord
    );
  }, [capacity, items.length, recUpdate, table]);

  /**
   * マスを描画する関数
   * @param status マスのstatus
   * @param i マスのインデックス (x座標)
   * @param j マスのインデックス (y座標)
   */
  const renderSquare = useCallback((status: Status, i: number, j: number) => {
    return (
      <Square
        key={`square-${i * 11 + j}`}
        worth={status.worth}
        isInProcess={status.isInProcess}
        isProcessed={status.isProcessed}
        isReffered={status.isReffered}
        isBasis={status.isBasis}
        includedItems={status.includedItems}
      />
    );
  }, []);

  /**
   * tableのi行目を描画する関数
   * @param i 何行目か
   */
  const renderRow = useCallback(
    (i: number) => {
      return (
        <tr key={`table-row-${i}`} className={classes.trData}>
          {i === 0 ? (
            <th className={classes.thIndex}>
              <Chip
                label="空の状態"
                variant="outlined"
                className={classes.emptyChip}
              />
            </th>
          ) : (
            <th className={classes.thIndex}>
              {items[i - 1] !== undefined ? (
                <Chip
                  icon={
                    items[i - 1].isProcessed ? (
                      <CheckCircleIcon />
                    ) : (
                      <RemoveCircleIcon />
                    )
                  }
                  label={`重さ: ${items[i - 1].weight}, 価値: ${
                    items[i - 1].worth
                  }`}
                  color={items[i - 1].isProcessed ? 'primary' : 'secondary'}
                  className={classes.itemChip}
                  onDelete={
                    condition.eval !== 'BEFORE' && condition.eval !== 'COMPLETE'
                      ? undefined
                      : () => handleDelete(items[i - 1])
                  }
                />
              ) : null}
            </th>
          )}
          {table[i].map((square, j) => renderSquare(square, i, j))}
        </tr>
      );
    },
    [
      classes.emptyChip,
      classes.itemChip,
      classes.trData,
      condition.eval,
      handleDelete,
      items,
      renderSquare,
      table,
    ]
  );

  /**
   * tableのカラム名を描画する関数
   * @param column 何カラム目か
   */
  const renderColumnNameRow = useCallback(
    (column: number) => {
      const row = [
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <th
          className={classes.thIndex}
          key={`table-column-name-row-${column}`}
        />,
      ];
      for (let i = 0; i <= column; i += 1) {
        row.push(
          <th className={classes.thColumn} key={i}>
            {i}
          </th>
        );
      }
      return <tr>{row}</tr>;
    },
    [classes.thColumn, classes.thIndex]
  );

  return (
    <Paper>
      <Box p={3} display="flex">
        <Box>
          <ViewComfyIcon />
        </Box>
        <Box flexGrow={1}>
          <Grid container spacing={2}>
            <Grid item xl={12} xs={12}>
              <Box className={classes.tableLabel}>
                <Typography variant="h5">ナップサックの容量</Typography>
              </Box>
            </Grid>
            <Grid item xl={12} xs={12}>
              <table className={classes.dpTable}>
                <tbody>
                  {renderColumnNameRow(10)}
                  {table.map((_, i) => renderRow(i))}
                </tbody>
              </table>
            </Grid>
            <Grid item xl={12} xs={12} container justify="flex-end">
              <Box className={classes.buttons}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={condition.eval !== 'COMPLETE'}
                  onClick={() => {
                    resetCondition();
                    resetTable();
                  }}
                >
                  RESET
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={
                    (condition.eval !== 'BEFORE' &&
                      condition.eval !== 'COMPLETE') ||
                    condition.items.length === 0
                  }
                  onClick={() => {
                    resetTable();
                    scanTable();
                  }}
                >
                  START
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default DpTable;
