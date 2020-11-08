import React, { Component} from "react";
import {hot} from "react-hot-loader";
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './app-routes';
import "./App.css";

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

const App = props => {
  return(
    <Router basename={baseHref} >
      <Routes />
    </Router>
  );
}

export default hot(module)(App);