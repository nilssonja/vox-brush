import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import './index.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducers from './reducers';

let store = createStore(appReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
