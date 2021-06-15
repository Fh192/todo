import { AuthData } from './../../types/authTypes';
const SET_AUTH_DATA_SUCCESS = 'actions/authActions/SET_AUTH_DATA_SUCCESS';
const SET_AUTH_DATA_ERROR = 'actions/authActions/SET_AUTH_DATA_ERROR';

export const setAuthDataSuccess = (payload: AuthData) =>
  ({
    type: SET_AUTH_DATA_SUCCESS,
    payload,
  } as const);

export const setAuthDataError = (payload: string) =>
  ({ type: SET_AUTH_DATA_ERROR, error: payload } as const);
