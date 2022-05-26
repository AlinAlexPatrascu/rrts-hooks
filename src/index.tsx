import React from 'react';
import ReactDOM from 'react-dom/client';

import { legacy_createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { App } from './components/App';
import { reducers } from './reducers';

const store = legacy_createStore(reducers, applyMiddleware(thunk));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
