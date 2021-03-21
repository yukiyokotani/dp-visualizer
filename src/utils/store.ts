import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tableSlice from '../features/dpTable/tableSlice';
import conditionSlice from '../features/condition/conditionSlice';
import themeSlice from '../features/theme/themeSlice';

const rootReducer = combineReducers({
  theme: themeSlice.reducer,
  table: tableSlice.reducer,
  condition: conditionSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Promiseを返すようにする
// https://react-redux.js.org/using-react-redux/static-typing#typing-the-usedispatch-hook
export type AppDispatch = typeof store.dispatch;

export default store;
