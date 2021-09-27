import { createReducer } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ThunkAction } from 'redux-thunk';
import { Action } from '../store';
import * as actions from '../actions/authActions';
import {
  setAuthDataSuccess,
  setAuthDataError,
  setCaptcha,
  logoutSuccess,
  loginError,
} from '../actions/authActions';
import auth from '../../api/auth';
import { LoginFormData } from '../../types/authTypes';

const initialState = {
  id: null as number | null,
  email: '' as string,
  login: '' as string,
  isAuthorize: false as boolean,
  captchaURL: '' as string,
  error: '' as string,
  authFetching: true as boolean,
};

export type AuthActions = ReturnType<Action<typeof actions>>;
export type AuthState = typeof initialState;

const authReducer = createReducer(initialState, b => {
  b.addCase(setAuthDataSuccess, (state, action) => {
    return {
      ...state,
      ...action.payload,
      isAuthorize: true,
    };
  });

  b.addCase(setAuthDataError, (state, action) => {
    state.error = action.payload;
  });

  b.addCase(setCaptcha, (state, action) => {
    state.captchaURL = action.payload;
  });

  b.addCase(logoutSuccess, () => initialState);

  b.addCase(loginError, (state, action) => {
    state.error = action.payload;
  });

  b.addCase(actions.toggleAuthFetching, (state, action) => {
    state.authFetching = action.payload;
  });
});

type AuthThunk = ThunkAction<Promise<void>, RootState, unknown, AuthActions>;

export const getAuthData = (): AuthThunk => async dispatch => {
  dispatch(actions.toggleAuthFetching(true));

  const data = await auth.me();

  if (data.resultCode === 0) {
    dispatch(actions.setAuthDataSuccess(data.data));
  } else {
    dispatch(actions.setAuthDataError(data.messages.join('')));
  }

  dispatch(actions.toggleAuthFetching(false));
};

export const login =
  (loginFormData: LoginFormData): AuthThunk =>
  async dispatch => {
    const data = await auth.login(loginFormData);

    if (data.resultCode === 0) {
      dispatch(getAuthData());
    } else if (data.resultCode === 10) {
      const url = await auth.captchaURL();

      dispatch(actions.setCaptcha(url));
      dispatch(actions.loginError(data.messages.join('')));
    } else {
      dispatch(actions.loginError(data.messages.join('')));
    }
  };

export const logout = (): AuthThunk => async dispatch => {
  const data = await auth.logout();

  if (data.resultCode === 0) {
    dispatch(actions.logoutSuccess());
  } else {
    dispatch(loginError(data.messages.join('')));
  }
};

export default authReducer;
