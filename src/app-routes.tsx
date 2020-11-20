import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorCatchingRoute from './config/error/error-catching-route';
import Start from "./modules/start";

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorCatchingRoute path="/" exact component={Start} />
      <ErrorCatchingRoute component={Start} />
    </Switch>
  </div>
);

export default Routes;