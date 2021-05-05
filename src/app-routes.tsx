// If you come from app.tsx: We meet again, Yugi boy.
import React from 'react';
// Literally a switch statement for Routes
import { Switch } from 'react-router-dom';
// A component made by me :3 that encapsulates a route and prints a easy-to-read error when one occurs inside the original route.
import ErrorCatchingRoute from 'src/config/error/error-catching-route';
// This are our modules. In other words the actual pages (or more routes that go to actual pages).
import Start from 'src/modules/start/start';
import Users from 'src/modules/users';
import Test from 'src/modules/test/test';
import Login from 'src/modules/login/login';

// Another functional component? in my code?!
const Routes = () => (
  <div className="view-routes">
    <Switch>
      {/* Translation: "Router, if my url matches the path of this route, please render this component." */}
      <ErrorCatchingRoute path="/users" component={Users} />
      <ErrorCatchingRoute path="/test" component={Test} />
      <ErrorCatchingRoute path="/login" component={Login} />
      <ErrorCatchingRoute path="/" component={Start} />
      <ErrorCatchingRoute component={Start} />
    </Switch>
  </div>
);

// We export them
export default Routes;
// Where should you go next? Well there are a couple of component you can visit, like the 'Start' one on src/modules/start/start.tsx
