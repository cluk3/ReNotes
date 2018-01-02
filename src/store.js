import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";

const initialState = {};
const enhancers = [];
const middleware = [];
let composedEnhancers;

if (
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  composedEnhancers = composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers
  );
} else {
  composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
}

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
