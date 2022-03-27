import {BASE} from '../../types';

export type BaseStateType = {
  language?: string;
};

const initialState = {
  language: undefined,
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: BaseStateType = initialState, action: Action) => {
  switch (action.type) {
    case BASE.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};
