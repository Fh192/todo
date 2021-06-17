import { combineReducers } from 'redux';
import authReducer from './authReducer';
import todoReducer from './todoReducer';

const rootReducer = combineReducers({ auth: authReducer, todo: todoReducer });

export default rootReducer;
