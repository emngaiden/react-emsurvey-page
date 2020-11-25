import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorCatchingRoute from "src/config/error/error-catching-route";
import UserList from './user-list';
import UserUpdate from './user-update';

const Routes = ({ match }) => (
    <>
      <Switch>
        <ErrorCatchingRoute path={`${match.url}/new`} exact component={UserUpdate} />
        <ErrorCatchingRoute path={`${match.url}/edit/:id`} exact component={UserUpdate} />
        <ErrorCatchingRoute path={`${match.url}/`} exact component={UserList} />
        <ErrorCatchingRoute path={match.url} component={UserList} />
      </Switch>
    </>
  );

export default Routes;