import React, { useState } from 'react';
import Table from './component/Table';
import List from './component/List';
import Knapscak from './component/Knapsack';
import Form from './component/Form';
import Status from './component/Status';

const App = () => {
  const [items, setItems] = useState([
    { weight: 2, value: 3, isIncluded: false, isReffered: false },
    { weight: 1, value: 2, isIncluded: false, isReffered: false },
    { weight: 3, value: 3, isIncluded: false, isReffered: false },
    { weight: 2, value: 5, isIncluded: false, isReffered: false },
    { weight: 4, value: 6, isIncluded: false, isReffered: false },])
  const [knapsackCap, setKnapsackCap] = useState(8);
  const [status, setStatus] = useState("OVER");

  const addItem = (weight, value) => {
    let newItems = [...items, { weight: weight, value: value, isIncluded: false }];
    setItems(newItems);
  }

  const deleteItem = (i) => {
    let newItems = [...items];
    newItems.splice(i, 1);
    setItems(newItems);
  }

  const includedTrue = (i) => {
    let newItems = [...items];
    newItems[i].isIncluded = true;
    setItems(newItems);
  }

  const includedAllFalse = () => {
    let newItems = [...items];
    newItems.forEach(item => item.isIncluded = false);
    setItems(newItems);
  }

  const setReffered = (i, bool) => {
    let newItems = [...items];
    newItems.forEach(item => item.isReffered = false);
    newItems[i].isReffered = bool;
    setItems(newItems);
  }

  return (
    < div className="App" >
      <p className="title">Knapsack Problem</p>
      <Knapscak knapsackCap={knapsackCap} setKnapsackCap={setKnapsackCap} />
      <Form addItem={addItem} />
      <List items={items} deleteItem={deleteItem} />
      <Status status={status} />
      <Table items={items} knapsackCap={knapsackCap} includedTrue={includedTrue} includedAllFalse={includedAllFalse} setReffered={setReffered} setStatus={setStatus} />
    </div >
  )
}

export default App;