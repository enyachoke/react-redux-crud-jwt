import React from 'react';
import { Route , IndexRoute} from 'react-router';

/* containers */
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import NotFound from 'containers/NotFound'
import {DetermineAuth} from 'containers/DetermineAuth';
import {requireAuthentication} from 'containers/AuthenticatedComponent';
import {requireNoAuthentication} from 'containers/notAuthenticatedComponent';
import LoginView from 'containers/LoginView'
import Analytics from 'containers/Analytics'
import { App } from 'layouts/App';
import { HomeContainer } from 'layouts/HomeContainer';

export default (
    <Route path="/" component={App}>
      <IndexRoute component={requireAuthentication(HomeView)} />
      <Route path="login" component={requireNoAuthentication(LoginView)}/>
      <Route path="analytics" component={requireAuthentication(Analytics)}/>
      <Route path="home" component={requireAuthentication(HomeContainer)}/>
      <Route path="*" component={DetermineAuth(NotFound)}/>

    </Route>
);
