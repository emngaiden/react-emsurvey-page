// START HERE.
// We import React because we are doing a React app and... why am I even explaining this?.
import React from "react";
// We need the React virtual DOM so we can create react code that will be translated to html code. ez enough?
import ReactDOM from "react-dom";
// We import our App component.
import App from "./app";
// We import the provider for redux. Go ahead and google Redux.
import { Provider } from 'react-redux';
// We import our redux configuration that we saved on a different file because it makes our code looks modular, even if it isn't.
import initialize from './config/redux-config';
// We need this to make our page look fabulous!. You can remove it if you want.
import 'bootstrap/dist/css/bootstrap.min.css';
// Alert component created by me :3
import { Alerter } from 'src/components/alerter';
// get the root element from the html (on public/index.html) so React can append all its doom thing in it
const rootDiv = document.getElementById("root");

// This is a functional component. React will call this function to render this component.
const render = Component => {
    // Translation: "ReactDom, please render this component, with all its children, inside this html div. k thx."
    ReactDOM.render(
        // Provider of the redux store. Google redux for a 'what is?', continue for a 'how do you use it?'.
        <Provider store={initialize()}>
            {/* We 'inject' our alert component. You can create or use another alert component. Go ahead I don't care :( */}
            <Alerter.Alerter />
            {/* The component to be encapsulated in the redux store. Usually the App component */}
            <Component />
        </Provider>,
        rootDiv
    );
}

//ERROR TIP
// If your webpage isn't rendering anything, you should probably start looking here.
// Calling the function as specified above. 'App' is our App component (on src/app.tsx, imported above).
render(App);
// Still here? great! now go to src/app.tsx