import * as React from 'react'
import { IndexRoute, Route, IndexRedirect, Redirect } from 'react-router'
import { push } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import App from './containers/app/App'

import AuthLayout from './components/auth/AuthLayout'
import SignUp from './containers/auth/SignUp'
import SignIn from './containers/auth/SignIn'
import RestorePassword from './containers/auth/RestorePassword'

import AppLayout from './containers/app/AppLayout'
import ProfileEdit from './containers/profile/ProfileEdit'
import ProfileView from './containers/profile/ProfileView'
import Employees from './containers/employees/Employees'
import Search from './containers/search/Search'


const UserIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.app.app,
  predicate: (app) => app.authorized,
  redirectAction: push,
  failureRedirectPath: '/auth/singin',
  allowRedirectBack: false
})

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/auth/signin"/>

    <Route path="auth" component={AuthLayout}>
      <Route path="signup" component={SignUp}/>
      <Route path="signin" component={SignIn}/>
      <Route path="password" component={RestorePassword}/>
    </Route>

    <Route path="app" component={UserIsAuthenticated(AppLayout)}>
      <Route path="profile" component={ProfileView}/>
      <Route path="profile/edit" component={ProfileEdit}/>
      <Route path="employees" component={Employees}/>
      <Route path="search" component={Search}/>
    </Route>

    <Redirect from="*" to="/auth/signin" />
  </Route>
)
