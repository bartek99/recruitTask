import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import DashboardPages from './ui/DashboardPages';
ReactDOM.render(
    <React.StrictMode>
    <Router>
      <Route path="/">
          <DashboardPages />
      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
