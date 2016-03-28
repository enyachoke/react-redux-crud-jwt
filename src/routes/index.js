import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import HomeView from 'views/HomeView/HomeView'
import NotFound from 'containers/NotFound'
import {DetermineAuth} from 'containers/DetermineAuth'
import {requireAuthentication} from 'containers/AuthenticatedComponent'
import {requireNoAuthentication} from 'containers/notAuthenticatedComponent'
import LoginView from 'containers/LoginView'
import Analytics from 'containers/Analytics'
import { App } from 'layouts/App'
import { HomeContainer } from '../layouts/HomeContainer'
import ClientsView from 'views/ClientsView'
export default (
  <Route path='/' component={App}>
    <IndexRedirect to="/home" />
    <Route path='login' component={requireNoAuthentication(LoginView)}/>
    <Route path='analytics' component={requireAuthentication(Analytics)}/>
    <Route path='home' component={requireAuthentication(HomeContainer)}/>
    <Route path='clients' component={requireAuthentication(ClientsView)}/>
    <Route path='*' component={DetermineAuth(NotFound)}/>
  </Route>
)
