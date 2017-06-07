import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import createReducer from './reducers';


export default function configureStore(history, initialState = {}) {
  const store = createStore(createReducer(), initialState, compose(
    applyMiddleware(
      ReduxThunk,
      routerMiddleware(history),
    ),
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
  ));

  store.asyncReducers = {};

  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}