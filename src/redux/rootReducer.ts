import { combineReducers, routerReducer } from 'redux-seamless-immutable'
import { reducer as formReducer } from 'redux-form'

import app from './modules/app/app'
import appLayout from './modules/app/appLayout'
import profileCard from './modules/app/profileCard'

import companyCard from './modules/common/companyCard'
import emailTextarea from './modules/common/emailTextarea'
import alert from './modules/common/alert'

import select from './modules/common/select'
import activityTypes from './modules/common/activityTypes'

import signUp from './modules/auth/signUp'
import signIn from './modules/auth/signIn'
import restorePassword from './modules/auth/restorePassword'
import createCompany from './modules/auth/createCompany'

import profileView from './modules/profile/profileView'
import profileEdit from './modules/profile/profileEdit'

import employees from './modules/employees/employees'


export default combineReducers({
  routing: routerReducer,
  form: formReducer,

  app: combineReducers({
    app,
    appLayout,
    profileCard
  }),

  common: combineReducers({
    companyCard,
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
    profileView
  }),

  employees: combineReducers({
    employees
  })
})
