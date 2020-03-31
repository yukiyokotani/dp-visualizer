import React, { useState } from 'react';
import Square from './Square';
import Button from '@material-ui/core/Button';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: '10px 5%',
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }),
);

const initialSquare = () => ({
    value: 0,
    isInProcess: false,
    isProcessed: false,
    isReffered: false,
    isBaseReffered: false
})

const Table = (props) => {
    const classes = useStyles();

    const [table, setTable] = useState(
        Array(10).fill(0).map(() =>
            Array(11).fill(initialSquare()))
    );

    const knapsackCap = props.knapsackCap;
    const numOfItems = props.items.length;

    // table[i][j]のisInProcessだけ入力のbool値に更新
    const setInProcess = (i, j, bool) => {
        const newTable = [...table];
        newTable[i][j] = { ...table[i][j], isInProcess: bool }
        setTable(newTable);
    };

    // table[i][j]のisRefferedだけ入力のbool値に更新
    const setReffered = (i, j, bool) => {
        const newTable = [...table];
        newTable[i][j] = { ...table[i][j], isReffered: bool }
        setTable(newTable);
    };

    // table[i][j]のisBaseRefferedだけ入力のbool値に更新
    const setBaseReffered = (i, j, bool) => {
        const newTable = [...table];
        newTable[i][j] = { ...table[i][j], isBaseReffered: bool }
        setTable(newTable);
    };

    const resetTable = () => {
        props.includedAllFalse();
        props.setStatus("");
        props.setReffered(0, 0, false);
        setTable(Array(10).fill(0).map(() =>
            Array(11).fill(initialSquare())))
    }

    const rec = (intervalTime, currIndex, prevIndex, refferdIndex, refferdBaseIndex) => {
        if (currIndex.i === numOfItems) {
            props.setMaxValue(table[prevIndex.i][prevIndex.j].value)
            props.setStatus("COMPLETE");
            return;
        }
        props.includedTrue(currIndex.i);
        // ひとつ前の処理のハイライトの初期化
        setInProcess(prevIndex.i, prevIndex.j, false);
        setReffered(refferdIndex.i, refferdIndex.j, false);
        setBaseReffered(refferdBaseIndex.i, refferdBaseIndex.j, false);
        props.setReffered(currIndex.i, false);
        // 更新のための新しいtable
        const newTable = [...table];
        let knapsackVal;
        if (currIndex.j >= props.items[currIndex.i].weight) {
            //　itemがknapsackに入る場合
            // 参照するマスの指定とハイライト
            refferdIndex = { i: currIndex.i, j: currIndex.j - props.items[currIndex.i].weight };
            setReffered(refferdIndex.i, refferdIndex.j, true);
            refferdBaseIndex = { i: currIndex.i, j: currIndex.j };
            setBaseReffered(refferdBaseIndex.i, refferdBaseIndex.j, true);
            props.setReffered(currIndex.i, true);
            // itemをknapsackに入れるべきか評価する
            if (newTable[currIndex.i][currIndex.j - props.items[currIndex.i].weight].value + props.items[currIndex.i].value >= newTable[currIndex.i][currIndex.j].value) {
                // itemをknapsackに入れたほうが得な場合
                knapsackVal = newTable[currIndex.i][currIndex.j - props.items[currIndex.i].weight].value + props.items[currIndex.i].value;
                props.setStatus("PROFIT");
            } else {
                // itemをknapsackに入れると損な場合
                knapsackVal = newTable[currIndex.i][currIndex.j].value
                props.setStatus("LOSS");
            }
        } else {
            // itemがknapsackに入らない場合
            knapsackVal = newTable[currIndex.i][currIndex.j].value;
            props.setStatus("OVER");
        }
        // 評価結果をもとにtableを更新
        newTable[currIndex.i + 1][currIndex.j] = {
            value: knapsackVal,
            isInProcess: true,
            isProcessed: true,
            isReffered: false,
            isBaseReffered: false
        };
        setTable(newTable)
        // 次のマスへindexを更新
        prevIndex.i = currIndex.i + 1; // 参照渡しみたいなので分割して代入しないと
        prevIndex.j = currIndex.j; // prevとcurrが同期してしまう。
        currIndex.j += 1;
        if (currIndex.j === knapsackCap + 1) {
            currIndex.j = 0;
            currIndex.i += 1;
        }
        setTimeout(() => rec(intervalTime, currIndex, prevIndex, refferdIndex, refferdBaseIndex), intervalTime)
    }

    // isInProcessのマスを0.1sec毎に走査する関数
    const scanTable = () => {
        const intervalTime = 300;
        let currIndex = { i: 0, j: 0 };
        let prevIndex = { i: numOfItems, j: knapsackCap };
        let refferdIndex = { i: 0, j: 0 }; //アイテムを入れたあまりを最適化するボックス
        let refferdBaseIndex = { i: 0, j: 0 }; //一つ左のボックス

        // 新しいtableを用意
        const newTable = [...table];
        // 1行目を初期化
        for (var j = 0; j <= knapsackCap; j++) {
            newTable[0][j] = { ...newTable[0][j], isProcessed: true }
        }
        setTable(newTable);
        // 再帰関数の呼び出し
        rec(intervalTime, currIndex, prevIndex, refferdIndex, refferdBaseIndex)
    }

    // マスを描画する関数
    const renderSquare = (square, i, j) => {
        return (
            <Square
                key={i * 11 + j}
                value={square.value}
                isInProcess={square.isInProcess}
                isProcessed={square.isProcessed}
                isReffered={square.isReffered}
                isBaseReffered={square.isBaseReffered}
            />
        )
    };

    // tableのi行目を描画する関数
    const renderRow = (i) => {
        return (
            <tr key={i}>
                {i === 0 ? <th className="row-caption">空の状態</th> : <th className="row-caption">item {i}</th>}
                {table[i].map((square, j) => renderSquare(square, i, j))}
            </tr>
        )
    }

    const renderCaptionRow = (cap) => {
        const row = [<th className="row-caption" key={-1}></th>];
        for (var i = 0; i <= cap; i++) {
            row.push(<th className="col-caption" key={i}>{i}</th>)
        }
        return (
            <tr>{row}</tr>
        )
    };

    return (
        <div>
            <table className="dp-table">
                <tbody>
                    {renderCaptionRow(10)}
                    {table.map((row, i) => renderRow(i))}
                </tbody>
            </table>
            <Button variant="outlined" size="medium" color="primary" onClick={() => scanTable()} className={classes.margin}>
                START
            </Button>
            <Button variant="outlined" size="medium" color="secondary" onClick={() => resetTable()} className={classes.margin}>
                RESET
            </Button>
        </div>
    );
}

export default Table;