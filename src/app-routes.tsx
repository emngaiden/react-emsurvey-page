import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import Start from "./modules/start";

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <Route path="/" exact component={Start} />
      <Route component={Start} />
    </Switch>
  </div>
);

export default Routes;