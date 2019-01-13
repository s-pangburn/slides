import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import configureStore from './store/store';
import PresentViewContainer from './components/present/present_view_container.jsx';

import * as actions from './actions';

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={PresentViewContainer} />
        <Route path="/present" component={PresentViewContainer} />
      </Switch>
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
