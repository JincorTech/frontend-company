import { combineReducers, routerReducer } from 'redux-seamless-immutable'
import { reducer as formReducer } from 'redux-form'

import app from './modules/common/app'
import companyCard from './modules/common/companyCard'
import emailTextarea from './modules/common/emailTextarea'
import renderSelect from './modules/form/renderSelect'
import renderFilterSelect from './modules/form/renderFilterSelect'
import signUp from './modules/auth/signUp'
import createCompany from './modules/auth/createCompany'
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
    emailTextarea
  }),

  auth: combineReducers({
    signUp,
    createCompany
  }),

  profile: combineReducers({
    activityTypes,
    profileEdit
  })
})
