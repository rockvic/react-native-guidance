import {BASE} from '../../types';

export type BaseStateType = {
  locale: string;
};

const initialState = {
  locale: 'cn',
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: BaseStateType = initialState, action: Action) => {
  switch (action.type) {
    case BASE.SET_LOCALE:
      return {
        ...state,
        locale: action.payload,
      };
    default:
      return state;
  }
};
