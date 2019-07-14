import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { createStateObserverMiddleware } from 'helpers/stateObserver';
import notesObserver from 'Notes/modules/observer';

const initialState = {};
const enhancers = [];
const middleware = [thunk, createStateObserverMiddleware(notesObserver)];

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeFn = composeEnhancers || compose;
const composedEnhancers = composeFn(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
