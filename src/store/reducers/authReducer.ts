import { RootState } from './../../../../weather-forecast/src/store/store';
import { ThunkAction } from 'redux-thunk';
import { Action } from '../store';
import * as actions from '../actions/authActions';
import auth from '../../api/auth';
import { LoginFormData } from '../../types/authTypes';

const initialState = {
  id: null as number | null,
  email: '' as string,
  login: '' as string,
  isAuthorize: false as boolean,
  captchaURL: '' as string,
  error: '' as string,
};

type AuthActions = ReturnType<Action<typeof actions>>;
type AuthState = typeof initialState;

function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case 'actions/authActions/SET_AUTH_DATA_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isAuthorize: true,
      };

    case 'actions/authActions/SET_AUTH_DATA_ERROR':
      return {
        ...state,
        //!!!//
      };

    case 'actions/authActions/SET_CAPTCHA':
      return {
        ...state,
        captchaURL: action.payload,
      };

    case 'actions/authActions/LOGOUT_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isAuthorize: false,
      };

    case 'actions/authActions/LOGIN_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

type AuthThunk = ThunkAction<Promise<void>, RootState, unknown, AuthActions>;

export const getAuthData = (): AuthThunk => async dispatch => {
  try {
    const data = await auth.me();

    if (data.resultCode === 0) {
      dispatch(actions.setAuthDataSuccess(data.data));
    } else {
      throw new Error(...data.messages);
    }
  } catch (e) {
    console.log(e.message);
    dispatch(actions.setAuthDataError(e.message));
  }
};

export const login =
  (loginFormData: LoginFormData): AuthThunk =>
  async dispatch => {
    try {
      const data = await auth.login(loginFormData);
      if (data.resultCode === 0) {
        dispatch(getAuthData());
      } else if (data.resultCode === 10) {
        const url = await auth.captchaURL();
        dispatch(actions.setCaptcha(url));
        dispatch(actions.loginError(data.messages[0]));
      } else {
        throw new Error(data.messages[0]);
      }
    } catch (e) {
      dispatch(actions.loginError(e.message));
      console.log(e.message);
    }
  };

export const logout = (): AuthThunk => async dispatch => {
  try {
    const data = await auth.logout();
    if (data.resultCode === 0) {
      dispatch(actions.logoutSuccess(data.data));
    } else {
      throw new Error(data.messages[0]);
    }
  } catch (e) {
    console.log(e.message);
  }
};

export default authReducer;
