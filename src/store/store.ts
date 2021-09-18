import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export type RootReducer = typeof rootReducer;
export type Action<T> = T extends { [key: string]: infer U } ? U : never;

export default store;
