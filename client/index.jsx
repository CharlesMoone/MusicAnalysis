import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory as historyProvider } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './stores';
import { createRoutes } from './routes';


export const store = configureStore(historyProvider, window.INITIAL_STATE);
const routes = createRoutes(store);
export const history = syncHistoryWithStore(historyProvider, store);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  window.document.getElementById('app')
);