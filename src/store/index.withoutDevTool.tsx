import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import logger from './middleware/logger';
import monitorReducer from './enhancers/monitorReducer';
import reducers from './reducers';

export default function configureStore(preloadedState: any) {
  const middlewareEnhancer = applyMiddleware(logger, thunk);
  const composedEnhancers = compose(middlewareEnhancer, monitorReducer);

  const store = createStore(reducers, preloadedState, composedEnhancers as any);

  return store;
}
