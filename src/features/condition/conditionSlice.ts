import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Item = {
  weight: number;
  worth: number;
  isIncluded: boolean;
};

export type Eval = 'BEFORE' | 'PROFIT' | 'LOSS' | 'OVER' | 'COMPLETE';
export type Condition = 'IDLING' | 'PROCESSING';

export type ConditionState = {
  items: Item[];
  capacity: number;
  maxWorth: number;
  eval: Eval;
  condition: Condition;
};

const initialState: ConditionState = {
  items: [],
  capacity: 10,
  maxWorth: 0,
  eval: 'BEFORE',
  condition: 'IDLING',
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
    setIncluded: (
      state,
      action: PayloadAction<{ index: number; isIncluded: boolean }>
    ) => {
      state.items[action.payload.index].isIncluded = action.payload.isIncluded;
    },
    setIncludedAllFalse: (state) => {
      state.items.forEach((item) => {
        item.isIncluded = false;
      });
    },
    setReffered: (
      state,
      action: PayloadAction<{ index: number; isReffered: boolean }>
    ) => {
      state.items[action.payload.index].isIncluded = action.payload.isReffered;
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
    setCondition: (state, action: PayloadAction<Condition>) => {
      state.condition = action.payload;
    },
    resetCondition: () => initialState,
  },
});

export default conditionSlice;
