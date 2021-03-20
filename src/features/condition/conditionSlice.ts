import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Item = {
  weight: number;
  worth: number;
  isProcessed: boolean;
};

export type Eval = 'BEFORE' | 'PROFIT' | 'LOSS' | 'OVER' | 'COMPLETE';

export type ConditionState = {
  items: Item[];
  capacity: number;
  maxWorth: number;
  eval: Eval;
};

const initialState: ConditionState = {
  items: [],
  capacity: 10,
  maxWorth: 0,
  eval: 'BEFORE',
};

const conditionSlice = createSlice({
  name: 'condiiton',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    delItem: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    setProcessed: (
      state,
      action: PayloadAction<{ index: number; isProcessed: boolean }>
    ) => {
      state.items[action.payload.index].isProcessed =
        action.payload.isProcessed;
    },
    setIncludedAllFalse: (state) => {
      state.items.forEach((item) => {
        item.isProcessed = false;
      });
    },
    setCapacity: (state, action: PayloadAction<number>) => {
      state.capacity = action.payload;
    },
    setMaxWorth: (state, action: PayloadAction<number>) => {
      state.maxWorth = action.payload;
    },
    setEval: (state, action: PayloadAction<Eval>) => {
      state.eval = action.payload;
    },
    resetCondition: (state) => {
      const resetItems = state.items.map((item) => {
        return { weight: item.weight, worth: item.worth, isProcessed: false };
      });
      return {
        items: resetItems,
        capacity: state.capacity,
        maxWorth: 0,
        eval: 'BEFORE',
      };
    },
    clearCondition: () => initialState,
  },
});

export default conditionSlice;
