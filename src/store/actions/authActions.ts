import { AuthData } from './../../types/authTypes';
const SET_AUTH_DATA_SUCCESS = 'actions/authActions/SET_AUTH_DATA_SUCCESS';

export const setAuthDataSuccess = (payload: AuthData) =>
  ({
    type: SET_AUTH_DATA_SUCCESS,
    payload,
  } as const);
