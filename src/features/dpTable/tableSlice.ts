import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../condition/conditionSlice';

export type Status = {
  worth: number;
  isInProcess: boolean;
  isProcessed: boolean;
  isReffered: boolean;
  isBasis: boolean;
  includedItems: Item[];
};

export type Coordiante = {
  i: number;
  j: number;
};

const initialSquare: Status = {
  worth: 0,
  isInProcess: false,
  isProcessed: false,
  isReffered: false,
  isBasis: false,
  includedItems: [],
};

const initialState: Status[][] = Array(11)
  .fill(0)
  .map((_, i) => {
    if (i === 0) {
      return Array(11).fill({
        worth: 0,
        isInProcess: false,
        isProcessed: true,
        isReffered: false,
        isBasis: false,
        includedItems: [],
      });
    }
    return Array(11).fill(initialSquare);
  });

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setWorth: (
      state,
      action: PayloadAction<{ i: number; j: number; worth: number }>
    ) => {
      state[action.payload.i][action.payload.j].worth = action.payload.worth;
    },
    setInProcess: (
      state,
      action: PayloadAction<{ i: number; j: number; isInProcess: boolean }>
    ) => {
      state[action.payload.i][action.payload.j].isInProcess =
        action.payload.isInProcess;
    },
    setProcessed: (
      state,
      action: PayloadAction<{ i: number; j: number; isProcessed: boolean }>
    ) => {
      state[action.payload.i][action.payload.j].isProcessed =
        action.payload.isProcessed;
    },
    setReffered: (
      state,
      action: PayloadAction<{ i: number; j: number; isReffered: boolean }>
    ) => {
      state[action.payload.i][action.payload.j].isReffered =
        action.payload.isReffered;
    },
    setBasis: (
      state,
      action: PayloadAction<{ i: number; j: number; isBasis: boolean }>
    ) => {
      state[action.payload.i][action.payload.j].isBasis =
        action.payload.isBasis;
    },
    setTable: (_, action: PayloadAction<Status[][]>) => action.payload,
    resetTable: () => initialState,
  },
});

export default tableSlice;
