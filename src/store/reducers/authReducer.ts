import { AuthData } from './../../types/authTypes';
import { Action } from '../store';
import * as actions from '../actions/authActions';

const initialState: AuthData = {
  id: null as number | null,
  email: '' as string,
  login: '' as string,
};

type AuthActions = ReturnType<Action<typeof actions>>;

function authReducer(state = initialState, action: AuthActions): AuthData {
  switch (action.type) {
    case 'actions/authActions/SET_AUTH_DATA_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

export default authReducer;
