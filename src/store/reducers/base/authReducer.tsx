import {AUTH} from '../../types';
import Global from '../../../Global';

export type AuthStateType = {
  isLoggedIn: boolean;
  token?: string;
  currUser: object;
};

const initialState = {
  isLoggedIn: false,
  token: undefined,
  currUser: {},
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: AuthStateType = initialState, action: Action) => {
  switch (action.type) {
    case AUTH.LOGIN:
      Global.token = action.payload.token;
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        currUser: action.payload.currUser,
      };
    case AUTH.LOGOUT:
      Global.token = ''; // null;
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        currUser: {},
      };
    default:
      return state;
  }
};
