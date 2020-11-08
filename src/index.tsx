import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import 'bootstrap/dist/css/bootstrap.min.css';

const rootDiv = document.getElementById("root");

const render = Component => {
    ReactDOM.render(
        <Component />,
        rootDiv
    );
}

render(App);