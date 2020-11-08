import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Provider } from 'react-redux';
import initialize from './config/redux-config';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootDiv = document.getElementById("root");

const render = Component => {
    ReactDOM.render(
        <Provider store={initialize()}>
            <Component />
        </Provider>,
        rootDiv
    );
}

render(App);