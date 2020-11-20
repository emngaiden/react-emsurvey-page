import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './app-routes';
import './app.css';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

const App = props => {
  return(
    <div className="app-container">
      <Router basename={baseHref} >
        <Routes />
      </Router>
    </div>
  );
}

export default hot(module)(App);