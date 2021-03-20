import React, { useCallback } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Button, Card, Chip, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Square from './Square';
import tableSlice, { Status, Coordiante } from './tableSlice';
import { RootState } from '../../utils/store';
import conditionSlice, {
  Eval,
  ConditionState,
} from '../condition/conditionSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    tableIndex: {
      height: '50px',
    },
    tableIndexColumn: {
      width: '200px',
    },
    tableDataColumn: {
      height: '50px',
      width: 'calc((100% - 200px)/11)',
      minWidth: 'calc((100% - 200px)/11)',
      maxWidth: 'calc((100% - 200px)/11)',
    },
    itemChip: {
      width: '90%',
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

  const updateIncluded = useCallback(
    (newIncluded: { index: number; isIncluded: boolean }) => {
      dispatch(conditionSlice.actions.setIncluded(newIncluded));
    },
    [dispatch]
  );

  const updateReffered = useCallback(
    (newReffered: { index: number; isReffered: boolean }) => {
      dispatch(conditionSlice.actions.setReffered(newReffered));
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
    (index: number) => {
      dispatch(conditionSlice.actions.delItem(index));
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
      updateIncluded({ index: prevCurr.i, isIncluded: true });
      updateReffered({ index: prevCurr.i, isReffered: false });

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
      if (prevCurr.j >= items[prevCurr.i].weight) {
        // itemがknapsackに入る場合
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
        updateReffered({ index: prevCurr.i, isReffered: true });
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
          updateEval('PROFIT');
        } else {
          // itemをknapsackに入れると損な場合
          newWorth = newTable[prevCurr.i][prevCurr.j].worth;
          updateEval('LOSS');
        }
      } else {
        // itemがknapsackに入らない場合
        newWorth = newTable[prevCurr.i][prevCurr.j].worth;
        updateEval('OVER');
      }
      // 評価結果をもとにtableを更新
      newTable[prevCurr.i + 1][prevCurr.j] = {
        worth: newWorth,
        isInProcess: true,
        isProcessed: true,
        isReffered: false,
        isBasis: false,
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
    [
      capacity,
      items,
      updateEval,
      updateIncluded,
      updateMaxWorth,
      updateReffered,
      updateTable,
    ]
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
  }, [capacity, items.length, recUpdate, resetTable, table]);

  /**
   * マスを描画する関数
   * @param status マスのstatus
   * @param i マスのインデックス (x座標)
   * @param j マスのインデックス (y座標)
   */
  const renderSquare = useCallback((status: Status, i: number, j: number) => {
    return (
      <Square
        key={i * 11 + j}
        worth={status.worth}
        isInProcess={status.isInProcess}
        isProcessed={status.isProcessed}
        isReffered={status.isReffered}
        isBasis={status.isBasis}
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
        <tr key={i} className={classes.tableIndex}>
          {i === 0 ? (
            <th>
              <Chip
                label="空の状態"
                variant="outlined"
                className={classes.itemChip}
              />
            </th>
          ) : (
            <th>
              {items[i - 1] !== undefined ? (
                <Chip
                  avatar={<Avatar>💰</Avatar>}
                  label={`重さ: ${items[i - 1].weight}, 価値: ${
                    items[i - 1].worth
                  }`}
                  color="secondary"
                  onDelete={
                    condition.eval !== 'BEFORE' && condition.eval !== 'COMPLETE'
                      ? undefined
                      : handleDelete
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
      classes.itemChip,
      classes.tableIndex,
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
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
      const row = [<th className={classes.tableIndexColumn} key={-1} />];
      for (let i = 0; i <= column; i += 1) {
        row.push(
          <th className={classes.tableDataColumn} key={i}>
            {i}
          </th>
        );
      }
      return <tr>{row}</tr>;
    },
    [classes.tableDataColumn, classes.tableIndexColumn]
  );

  return (
    <Card>
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xl={12} xs={12}>
            <table className={classes.dpTable}>
              <tbody>
                {renderColumnNameRow(10)}
                {table.map((row, i) => renderRow(i))}
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
                  condition.eval !== 'BEFORE' && condition.eval !== 'COMPLETE'
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
    </Card>
  );
};

export default DpTable;
