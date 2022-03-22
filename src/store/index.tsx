import {createStore, applyMiddleware, StoreEnhancer} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
// import {composeWithDevTools} from 'remote-redux-devtools';

import logger from './middleware/logger';
import monitorReducer from './enhancers/monitorReducer';
import reducers from './reducers';

// 可配置初始化状态的 Store
const configureStore = (preloadedState: any) => {
  const middlewareEnhancer = applyMiddleware(logger, thunk);
  const enhancers = [middlewareEnhancer, monitorReducer];
  const composedEnhancers: StoreEnhancer = composeWithDevTools(...enhancers);

  const store = createStore(reducers, preloadedState, composedEnhancers);

  return store;
};

const store = configureStore(undefined);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
