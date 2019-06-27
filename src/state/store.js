import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import thunk from 'redux-thunk';
import { createStateObserverMiddleware } from 'helpers/stateObserver';
import notesObserver from 'Notes/modules/observer';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const enhancers = [];
const middleware = [
  sagaMiddleware,
  thunk,
  createStateObserverMiddleware(notesObserver)
];

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeFn = composeEnhancers || compose;
const composedEnhancers = composeFn(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(rootReducer, initialState, composedEnhancers);

sagaMiddleware.run(rootSaga);
export default store;