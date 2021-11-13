import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Item = {
  id: string;
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
  enableAnimation: boolean;
};

const initialState: ConditionState = {
  items: [],
  capacity: 10,
  maxWorth: 0,
  eval: 'BEFORE',
  enableAnimation: true,
};

const conditionSlice = createSlice({
  name: 'condiiton',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    delItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
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
        return {
          id: item.id,
          weight: item.weight,
          worth: item.worth,
          isProcessed: false,
        };
      });
      return {
        items: resetItems,
        capacity: state.capacity,
        maxWorth: 0,
        eval: 'BEFORE',
        enableAnimation: state.enableAnimation,
      };
    },
    clearCondition: () => initialState,
    toggleAnimation: (state) => {
      state.enableAnimation = !state.enableAnimation;
    },
  },
});

export default conditionSlice;
