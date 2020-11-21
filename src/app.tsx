import React, { Component} from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router } from 'react-router-dom';
import { IRootState } from 'src/shared/reducers';
import Routes from './app-routes';
import { setLocale } from 'src/shared/reducers/locale.reducer';
import { connect } from 'react-redux';
import { createFileTree } from 'src/shared/utils/translation/translation.constants';
import './app.css';


const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IAppProps extends DispatchProps, StateProps{}

class App extends React.Component<IAppProps> {

  constructor(props) {
    super(props);
    createFileTree(this.props.localeKey);
  }

  render() {
    return (
      <div className="app-container">
        <Router basename={baseHref} >
          <Routes />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  localeKey: state.locale.languageKey,
  localeName: state.locale.languageName,
});

const mapDispatchToProps = {
  setLocale
}

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App));