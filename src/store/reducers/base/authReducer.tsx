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
      setAuthLS({});
      return {
        ...state,
        isSignedIn: false,
        token: null,
        currUser: {},
      };
    case AUTH.SET_USER_INFO:
      const tmpUsers4Update = state.users.concat([]);
      for (let i = 0 ; i < tmpUsers4Update.length ; i++) {
        if (tmpUsers4Update[i].account === action.payload.account) {
          tmpUsers4Update[i] = { ...tmpUsers4Update[i], ...action.payload.user };
          break;
        }
      }
      setUsersLS(tmpUsers4Update);
      return {
        ...state,
        users: tmpUsers4Update,
      };
    case AUTH.SET_CURR_USER_INFO:
      const currUser4Update = { ...state.currUser, ...action.payload };
      setAuthLS({
        isSignedIn: state.isSignedIn,
        token: state.token,
        currUser: currUser4Update,
      });
      return {
        ...state,
        currUser: currUser4Update,
      };
    default:
      return state;
  }
};
