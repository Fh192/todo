import { createAction } from '@reduxjs/toolkit';
import { AuthData } from './../../types/authTypes';

export const setAuthDataSuccess = createAction<AuthData>(
  'authActions/SET_AUTH_DATA_SUCCESS'
);

export const setAuthDataError = createAction<string>(
  'authActions/SET_AUTH_DATA_ERROR'
);

export const setCaptcha = createAction<string>('authActions/SET_CAPTCHA');

export const logoutSuccess = createAction('authActions/LOGOUT_SUCCESS');

export const loginError = createAction<string>('authActions/LOGIN_ERROR');
