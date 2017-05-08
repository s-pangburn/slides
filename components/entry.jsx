import React from 'react';
import ReactDOM from 'react-dom';
import Edit from './edit';
import { BrowserRouter as Router, Route } from 'react-router-dom';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(
    <Router>
      <Route path="/" component={Edit} />
    </Router>, root);
});
