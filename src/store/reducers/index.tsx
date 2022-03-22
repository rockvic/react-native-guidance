import {combineReducers, Reducer} from 'redux';

import base, {BaseStateType} from './base/baseReducer';
import auth, {AuthStateType} from './base/authReducer';

export interface StateType {
  base: BaseStateType;
  auth: AuthStateType;
}

/**
 * 合并多个 reducer
 * combine reducers
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const appReducers: Reducer<StateType> = combineReducers({
  base: base,
  auth: auth,
});

export default appReducers;

export type State = ReturnType<typeof appReducers>;
