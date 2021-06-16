import { AuthData, LoginFormData } from './../../types/authTypes';
const SET_AUTH_DATA_SUCCESS = 'actions/authActions/SET_AUTH_DATA_SUCCESS';
const SET_AUTH_DATA_ERROR = 'actions/authActions/SET_AUTH_DATA_ERROR';
const LOGOUT_SUCCESS = 'actions/authActions/LOGOUT_SUCCESS';
const SET_CAPTCHA = 'actions/authActions/SET_CAPTCHA';
const LOGIN_ERROR = 'actions/authActions/LOGIN_ERROR';

export const setAuthDataSuccess = (payload: AuthData) =>
  ({
    type: SET_AUTH_DATA_SUCCESS,
    payload,
  } as const);

export const setCaptcha = (url: string) =>
  ({ type: SET_CAPTCHA, payload: url } as const);

export const setAuthDataError = (error: string) =>
  ({ type: SET_AUTH_DATA_ERROR, payload: error } as const);
  
export const loginError = (error: string) =>
  ({ type: LOGIN_ERROR, payload: error } as const);

export const logoutSuccess = (data: {}) =>
  ({ type: LOGOUT_SUCCESS, payload: data } as const);
