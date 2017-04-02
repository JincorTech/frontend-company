import { combineReducers, routerReducer } from 'redux-seamless-immutable'
import { reducer as formReducer } from 'redux-form'

import app from './modules/common/app'
import companyCard from './modules/common/companyCard'
import emailTextarea from './modules/common/emailTextarea'
import alert from './modules/common/alert'

import renderSelect from './modules/form/renderSelect'
import renderFilterSelect from './modules/form/renderFilterSelect'

import signUp from './modules/auth/signUp'
import signIn from './modules/auth/signIn'
import restorePassword from './modules/auth/restorePassword'
import createCompany from './modules/auth/createCompany'

import profile from './modules/profile/profile'
import activityTypes from './modules/profile/activityTypes'
import profileEdit from './modules/profile/profileEdit'


export default combineReducers({
  routing: routerReducer,
  form: formReducer,

  formFields: combineReducers({
    renderSelect,
    renderFilterSelect
  }),

  common: combineReducers({
    app,
    companyCard,
    emailTextarea,
    alert
  }),

  auth: combineReducers({
    signIn,
    signUp,
    restorePassword,
    createCompany
  }),

  profile: combineReducers({
    activityTypes,
    profileEdit,
    profile
  })
})
