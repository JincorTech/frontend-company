import * as React from 'react'
import { IndexRoute, Route, IndexRedirect, Redirect } from 'react-router'
import { push } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import AuthLayout from './components/auth/AuthLayout'
import SignUp from './containers/auth/SignUp'
import SignIn from './containers/auth/SignIn'
import RestorePassword from './containers/auth/RestorePassword'

import AppLayout from './containers/app/AppLayout'
import Profile from './containers/profile/Profile'
import Employees from './containers/employees/Employees'


const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.common.app,
  predicate: (app) => app.authorized,
  redirectAction: push,
  failureRedirectPath: '/auth/singin',
  allowRedirectBack: false
})

export default (
  <Route path="/">
    <IndexRedirect to="/auth/signin"/>

    <Route path="auth" component={AuthLayout}>
      <Route path="signup" component={SignUp}/>
      <Route path="signin" component={SignIn}/>
      <Route path="password" component={RestorePassword}/>
    </Route>

    {/*<Route path="app" component={UserIsAuthenticated(AppLayout)}>*/} // NOTE Disable auth wrapper
    <Route path="app" component={AppLayout}>
      <Route path="profile" component={Profile}/>
      <Route path="employees" component={Employees}/>
    </Route>

    <Redirect from="*" to="/auth/signin" />
  </Route>
)
