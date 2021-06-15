import rootReducer from './reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type RootReducer = typeof rootReducer;

export type Action<T> = T extends { [key: string]: infer U } ? U : never;

export default store;
