import { AUTH } from '../../types';
import Global from '../../../Global';
import { setAuthLS, setUsersLS } from '../../../utils/Storage';

export type UserType = {
  account: string;
  accountMask: string;
  password: string;
  avatar?: string;
  alias?: string;
};

export type AuthStateType = {
  users: UserType[] | [];
  isSignedIn: boolean;
  token?: string;
  currUser: UserType | {};
};

const initialState: AuthStateType = {
  users: [],
  isSignedIn: false,
  token: undefined,
  currUser: {},
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: AuthStateType = initialState, action: Action) => {
  switch (action.type) {
    case AUTH.SIGN_UP:
      const tmpUsers = state.users.concat([]);
      tmpUsers.push(action.payload);
      setUsersLS(tmpUsers);
      return {
        ...state,
        users: tmpUsers,
      };
    case AUTH.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case AUTH.SIGN_IN:
      Global.token = action.payload.token;
      const currUser = {
        isSignedIn: true,
        token: action.payload.token,
        currUser: action.payload.currUser,
      };
      setAuthLS(currUser);
      return {
        ...state,
        ...currUser
      };
    case AUTH.SIGN_OUT:
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
