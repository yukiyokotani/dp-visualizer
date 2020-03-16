import React, { useState } from 'react';
import Square from './Square';

const Table = (props) => {
    const [table, setTable] = useState(Array(10).fill(0).map(() =>
        Array(11).fill({
            value: 0,
            isInProcess: false,
            isProcessed: false,
            isReffered: false,
            isBaseReffered: false
        })));

    const knapsackCap = props.knapsackCap;
    const numOfItems = props.items.length;

    // table[i][j]のisInProcessだけ入力のbool値に更新
    const setInProcess = (i, j, bool) => {
        const newTable = [...table];
        newTable[i][j] = {
            value: newTable[i][j].value,
            isInProcess: bool,
            isProcessed: newTable[i][j].isProcessed,
            isReffered: newTable[i][j].isReffered,
            isBaseReffered: newTable[i][j].isBaseReffered
        }
        setTable(newTable);
    };

    // table[i][j]のisRefferedだけ入力のbool値に更新
    const setReffered = (i, j, bool) => {
        const newTable = [...table];
        newTable[i][j] = {
            value: newTable[i][j].value,
            isInProcess: newTable[i][j].isInProcess,
            isProcessed: newTable[i][j].isProcessed,
            isReffered: bool,
            isBaseReffered: newTable[i][j].isBaseReffered
        }
        setTable(newTable);
    };

    // table[i][j]のisBaseRefferedだけ入力のbool値に更新
    const setBaseReffered = (i, j, bool) => {
        const newTable = [...table];
        newTable[i][j] = {
            value: newTable[i][j].value,
            isInProcess: newTable[i][j].isInProcess,
            isProcessed: newTable[i][j].isProcessed,
            isReffered: newTable[i][j].isReffered,
            isBaseReffered: bool
        }
        setTable(newTable);
    };

    const resetTable = () => {
        props.includedAllFalse();
        props.setReffered(0, 0, false);
        setTable(Array(10).fill(0).map(() =>
            Array(11).fill({
                value: 0,
                isInProcess: false,
                isProcessed: false,
                isReffered: false,
                isBaseReffered: false
            })))
    }

    // isInProcessのマスを0.1sec毎に走査する関数
    const scanTable = () => {
        const intervalTime = 1000;
        let currIndex = { i: 0, j: 0 };
        let prevIndex = { i: numOfItems, j: knapsackCap };
        let refferdIndex = { i: 0, j: 0 }; //アイテムを入れたあまりを最適化するボックス
        let refferdBaseIndex = { i: 0, j: 0 }; //一つ左のボックス
        const rec = () => {
            const recSub = () => {
                props.includedTrue(currIndex.i);
                if (currIndex.j === knapsackCap + 1) {
                    currIndex.j = 0;
                    currIndex.i += 1;
                    return;
                }
                const newTable = [...table];
                setInProcess(prevIndex.i, prevIndex.j, false);
                setReffered(refferdIndex.i, refferdIndex.j, false);
                setBaseReffered(refferdBaseIndex.i, refferdBaseIndex.j, false);
                props.setReffered(currIndex.i, false);

                //ナップサック問題の処理の部分
                let knapsackVal;
                if (currIndex.j >= props.items[currIndex.i].weight) {

                    //ここからrefferedのテスト
                    setReffered(currIndex.i, currIndex.j - props.items[currIndex.i].weight, true);
                    refferdIndex = { i: currIndex.i, j: currIndex.j - props.items[currIndex.i].weight };
                    setBaseReffered(currIndex.i, currIndex.j, true);
                    refferdBaseIndex = { i: currIndex.i, j: currIndex.j };
                    props.setReffered(currIndex.i, true);
                    //ここまでrefferedのテスト

                    // knapsackVal = Math.max(
                    //     newTable[currIndex.i][currIndex.j - props.items[currIndex.i].weight].value + props.items[currIndex.i].value,
                    //     newTable[currIndex.i][currIndex.j].value
                    // )
                    if (newTable[currIndex.i][currIndex.j - props.items[currIndex.i].weight].value + props.items[currIndex.i].value >= newTable[currIndex.i][currIndex.j].value) {
                        knapsackVal = newTable[currIndex.i][currIndex.j - props.items[currIndex.i].weight].value + props.items[currIndex.i].value;
                        props.setStatus("PROFIT");
                    } else {
                        knapsackVal = newTable[currIndex.i][currIndex.j].value
                        props.setStatus("LOSS");
                    }
                } else {
                    knapsackVal = newTable[currIndex.i][currIndex.j].value;
                    props.setStatus("OVER");
                }
                newTable[currIndex.i + 1][currIndex.j] = {
                    value: knapsackVal,
                    isInProcess: true,
                    isProcessed: true,
                    isReffered: false,
                    isBaseReffered: false
                };

                //足し算のサンプル
                //newTable[currIndex.i][currIndex.j] = { value: newTable[currIndex.i][currIndex.j].value + 1, isInProcess: true, isProcessed: true };

                setTable(newTable);
                prevIndex.i = currIndex.i + 1; // 参照渡しみたいなので分割して代入しないと
                prevIndex.j = currIndex.j; // prevとcurrが同期してしまう。
                currIndex.j += 1;
                setTimeout(() => recSub(), intervalTime);
            }
            if (currIndex.i === numOfItems - 1) return;
            recSub();
            setTimeout(() => rec(), intervalTime * (knapsackCap + 1));
        }
        const newTable = [...table];
        for (var j = 0; j <= knapsackCap; j++) {
            newTable[0][j] = {
                value: newTable[0][j].value,
                isInProcess: false,
                isProcessed: true,
                isReffered: false,
                isBaseReffered: false,
            };
        }
        setTable(newTable);
        rec();
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
                <th className="row-caption">item {i}</th>
                {table[i].map((square, j) => renderSquare(square, i, j))}
            </tr>
        )
    }

    const renderRowCaption = (cap) => {
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
                    {renderRowCaption(10)}
                    {table.map((row, i) => renderRow(i))}
                </tbody>
            </table>
            <button className="start-button" onClick={() => scanTable()}>START</button>
            <button className="reset-button" onClick={() => resetTable()}>RESET</button>
        </div>
    );
}

export default Table;