import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorCatchingRoute from './config/error/error-catching-route';
import Start from 'src/modules/start/start';
import Users from 'src/modules/users';

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorCatchingRoute path="/users" component={Users} />
      <ErrorCatchingRoute path="/" component={Start} />
      <ErrorCatchingRoute component={Start} />
    </Switch>
  </div>
);

export default Routes;