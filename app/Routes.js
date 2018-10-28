/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Home from './components/Home';
import Filter from './components/Filter';
import Settings from './components/Settings';
import CounterPage from './containers/CounterPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path="/filter" component={Filter} />
      <Route path="/settings" component={Settings} />
      <Route path={routes.HOME} component={Home} />
    </Switch>
  </App>
);
