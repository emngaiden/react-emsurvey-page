// We import React (>:|) and Component. We gonna extend (:O) our class (:D)
import React, { Component} from "react";
// We import a hot loader so we don't have to recompile every time we do a change.
import { hot } from "react-hot-loader";
// We import our router component! Google it, come on, I'll wait.
import { BrowserRouter as Router } from 'react-router-dom';
// We import our root state from the redux store.
import { IRootState } from 'src/shared/reducers';
// We import the actual routes of our app.
import Routes from './app-routes';
// Localization reducer so the whole app would be on the same language.
import { setLocale } from 'src/shared/reducers/locale.reducer';
// We import this method so we can connect this specific component to the reducer.
import { connect } from 'react-redux';
// Language stuff made by me. Go to this path index.ts file if you want to know more.
import { createFileTree } from 'src/shared/utils/translation';
// Our B) style
import './app.css';

// base-href html component on our header. Google it for a 'what is?'.
const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

// Interface that specifies the type of the props for this component. Only on .tsx components.
// If you don't know what a prop is, that's because you haven't read the React docs. Go and read them.
export interface IAppProps extends DispatchProps, StateProps{}

// Remember
// I added that comment but I don't remember why. How the turntables.

// Our app component. This is where the magic begins.
// This is a Class component. It's like functional components but for real programmers.
class App extends React.Component<IAppProps> {

  // Constructor. If we specify the constructor, we NEED to pass the props to the constructor and his super parent.
  constructor(props) {
    super(props);
    createFileTree(this.props.localeKey);
  }

  // You know the drill. This is the 
  render() {
    // ERROR TIP
    // I should clarify that you only can return 1 component on the render function, but that component can have as many children as you wish.
    return (
      <div className="app-container">
        {/* We render the route component, and add our page routes as its children. remember to pass the baseHref! */}
        <Router basename={baseHref} >
          <Routes />
        </Router>
      </div>
    );
  }
}

// Redux state props. In short: if any of this fields change in your reducer, this component will update
const mapStateToProps = (state: IRootState) => ({
  localeKey: state.locale.languageKey,
  localeName: state.locale.languageName,
});

// Redux dispatch props. In short: you can use this methods to change things in the reducer. Usually this methods come from any reducer you want.
const mapDispatchToProps = {
  setLocale
}

// We need this types, so we can extends our props so we can reference them inside our component.
export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;

// Translation: "redux, take this state props and dispatch props, please insert them into yourself (owo) and give me back a new component with all the new props. Also I must remember the type of component I gave you"
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App));
// Where should you go next? well You can go anywhere you want, but I suggest you check out src/app-routes.tsx.