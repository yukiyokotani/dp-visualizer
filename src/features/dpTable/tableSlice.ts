import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Status = {
  worth: number;
  isInProcess: boolean;
  isProcessed: boolean;
  isReffered: boolean;
  isBasis: boolean;
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
};

const initialState: Status[][] = Array(11)
  .fill(0)
  .map(() => Array(11).fill(initialSquare));

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
