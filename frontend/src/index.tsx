
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import AdminDashboard from './ui/admin/AdminDashboard';


    // const response = {
    //     statusCode: 200,
    //     headers: {
    //         "Access-Control-Allow-Headers" : "Content-Type",
    //         "Access-Control-Allow-Origin": "https://www.example.com",
    //         "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    //     },
    //     body: JSON.stringify('Hello from Lambda!'),
    // };
// var express=require('express');
// var app = express();
// var cors=require('cors');
// app.use(cors())
ReactDOM.render(
    <React.StrictMode>
    <Router>
      <Route path="/">
          <AdminDashboard />
      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
