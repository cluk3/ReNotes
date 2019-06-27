const _observers = [];

function evaluate(previousState, actualState, dispatch) {
  _observers.forEach(({ comparer, action }) => {
    if (comparer(previousState, actualState)) {
      action({ previousState, actualState, dispatch });
    }
  });
}

export function stateObserverMiddleware({ dispatch, getState }) {
  return next => action => {
    const previousState = getState();
    const result = next(action);
    const actualState = getState();
    evaluate(previousState, actualState, dispatch);

    return result;
  };
}

export function createStateObserverMiddleware(observers) {
  registerObserver(observers);
  return stateObserverMiddleware;
}

export function registerObserver(observers) {
  observers = [].concat(observers);
  _observers.push(...observers);
}
