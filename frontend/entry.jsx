import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import configureStore from './store/store';
import * as actions from './actions';

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Route path="/" component={() => (<div>HELLO!</div>)} />
    </HashRouter>
  </Provider>
);

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();
  window.store = store;
  window.actions = actions;
  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);
});
