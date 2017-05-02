import { combineReducers, routerReducer } from 'redux-seamless-immutable'
import { reducer as formReducer } from 'redux-form'

import app from './modules/app/app'
import appLayout from './modules/app/appLayout'

import companyCard from './modules/common/companyCard'
import profileCard from './modules/common/profileCard'
import emailTextarea from './modules/common/emailTextarea'
import alert from './modules/common/alert'

import select from './modules/common/select'
import activityTypes from './modules/common/activityTypes'

import signUp from './modules/auth/signUp'
import signIn from './modules/auth/signIn'
import restorePassword from './modules/auth/restorePassword'
import createCompany from './modules/auth/createCompany'

import profile from './modules/profile/profile'
import profileEdit from './modules/profile/profileEdit'

import employees from './modules/employees/employees'


export default combineReducers({
  routing: routerReducer,
  form: formReducer,

  app: combineReducers({
    app,
    appLayout
  }),

  common: combineReducers({
    companyCard,
    profileCard,
    emailTextarea,
    alert,
    select,
    activityTypes
  }),

  auth: combineReducers({
    signIn,
    signUp,
    restorePassword,
    createCompany
  }),

  profile: combineReducers({
    // activityTypes,
    profileEdit,
    profile
  }),

  employees: combineReducers({
    employees
  })
})
