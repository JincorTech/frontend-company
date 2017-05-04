/* TODO LEGACY */

import { createReducer, createAction, createAsyncAction, createSubmitAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

import { FormFields } from '../../../containers/profile/ProfileEdit'

/**
 * Types
 */
export type State = StateObj & ImmutableObject<StateObj>

export type StateObj = {
  countryVisible: boolean
  cityVisible: boolean
  activityFields: ActivityField[]
  spinner: false
}

export type ActivityField = {
  visible: boolean
}

/**
 * Actions
 */
export const ADD_FIELD = 'jincor/profile/profileEdit/ADD_ACTIVITY_FIELD'
export const REMOVE_FIELD = 'jincor/profile/profileEdit/REMOVE_ACTIVITY_FIELD'
export const OPEN_POPUP = 'jincor/profile/profileEdit/OPEN_ACTIVITY_POPUP'
export const CLOSE_POPUP = 'jincor/profile/profileEdit/CLOSE_ACTIVITY_POPUP'
export const UPDATE_PROFILE = 'profile/profileEdit/UPDATE_PROFILE'

export const OPEN_COUNTRIES = 'jincor/profile/profileEdit/OPEN_COUNTRIES'
export const CLOSE_COUNTRIES = 'jincor/profile/profileEdit/CLOSE_COUNTRIES'
export const OPEN_CITIES = 'jincor/profile/profileEdit/OPEN_CITIES'
export const CLOSE_CITIES = 'jincor/profile/profileEdit/CLOSE_CITIES'

/**
 * Action creators
 */
export const addActivityField = createAction<void>(ADD_FIELD)
export const removeActivityField = createAction<number>(REMOVE_FIELD)
export const openActivityPopup = createAction<number>(OPEN_POPUP)
export const closeActivityPopup = createAction<number>(CLOSE_POPUP)
export const updateProfile = createSubmitAction<FormFields, void>(UPDATE_PROFILE)

export const openCountrySelect = createAction<void>(OPEN_COUNTRIES)
export const closeCountrySelect = createAction<void>(CLOSE_COUNTRIES)
export const openCitySelect = createAction<void>(OPEN_CITIES)
export const closeCitySelect = createAction<void>(CLOSE_CITIES)

/**
 * Reducer
 */
const initialState = from<StateObj>({
  countryVisible: false,
  cityVisible: false,
  activityFields: [],
  spinner: false
})

export default createReducer<State>({
  [ADD_FIELD]: (state: State, action: Action<void>): State => (
    state.merge({
      activityFields: [
        ...state.activityFields,
        { visible: false }
      ]
    })
  ),

  [REMOVE_FIELD]: (state: State, { payload: index }: Action<number>): State => (
    state.merge({
      activityFields: [
        ...state.activityFields.slice(0, index),
        ...state.activityFields.slice(index + 1)
      ]
    })
  ),

  [CLOSE_POPUP]: (state: State, { payload: index }: Action<number>): State => (
    state.merge({
      activityFields: [
        ...state.activityFields.slice(0, index),
        { visible: false },
        ...state.activityFields.slice(index + 1)
      ]
    })
  ),

  [OPEN_POPUP]: (state: State, { payload: index }: Action<number>): State => (
    state.merge({
      activityFields: [
        ...state.activityFields.slice(0, index),
        { visible: true },
        ...state.activityFields.slice(index + 1)
      ]
    })
  ),

  [updateProfile.REQUEST]: (state: State): State => (
    state.merge({
      spinner: true
    })
  ),

  [updateProfile.SUCCESS]: (state: State): State => (
    state.merge({
      spinner: false
    })
  ),

  [OPEN_COUNTRIES]: (state: State): State => (
    state.merge({ countryVisible: true })
  ),

  [CLOSE_COUNTRIES]: (state: State): State => (
    state.merge({ countryVisible: false })
  ),

  [OPEN_CITIES]: (state: State): State => (
    state.merge({ cityVisible: true })
  ),

  [CLOSE_CITIES]: (state: State): State => (
    state.merge({ cityVisible: false })
  )
}, initialState)