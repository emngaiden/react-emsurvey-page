import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorCatchingRoute from './config/error/error-catching-route';
import Demo from 'src/modules/demo/demo';
import Start from 'src/modules/start/start';

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorCatchingRoute path="/demo" exact component={Demo} />
      <ErrorCatchingRoute path="/" exact component={Start} />
      <ErrorCatchingRoute component={Start} />
    </Switch>
  </div>
);

export default Routes;