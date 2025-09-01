import { configureStore } from '@reduxjs/toolkit';
import task2Reducer from './slices/task2Slice';

const store = configureStore({
  reducer: {
    task2: task2Reducer,
  },
});

export default store;
