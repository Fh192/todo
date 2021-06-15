import { RootState } from './../../../../weather-forecast/src/store/store';
import { ThunkAction } from 'redux-thunk';
import { Action } from '../store';
import * as actions from '../actions/authActions';
import { me } from '../../api/auth';

const initialState = {
  id: null as number | null,
  email: '' as string,
  login: '' as string,
  isAuthorize: false as boolean,
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

    default:
      return state;
  }
}

type AuthThunk = ThunkAction<Promise<void>, RootState, unknown, AuthActions>;

export const getAuthData = (): AuthThunk => async dispatch => {
  try {
    const data = await me();

    if (data.resultCode === 0) {
      dispatch(actions.setAuthDataSuccess(data.data));
    } else {
      throw new Error(...data.messages);
    }
  } catch (e) {
    console.log(e);
    dispatch(actions.setAuthDataError(e));
  }
};

export default authReducer;
