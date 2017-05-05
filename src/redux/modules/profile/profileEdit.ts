/* TODO LEGACY */

import { createReducer, createAction, createAsyncAction, createSubmitAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

import { FormFields } from '../../../containers/profile/ProfileEdit'

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  spinner: false
}

/**
 * Actions
 */
export const UPDATE_PROFILE = 'profile/profileEdit/UPDATE_PROFILE'
export const FETCH_PROFILE  = 'profile/profileEdit/FETCH_PROFILE'
export const UPDATE_CITIES  = 'profile/profileEdit/UPDATE_CITIES'

/**
 * Action creators
 */
export const updateProfile = createSubmitAction<FormFields, void>(UPDATE_PROFILE)
export const fetchProfile  = createAction<void>(FETCH_PROFILE)
export const updateCities  = createAction<string>(UPDATE_CITIES)

/**
 * Reducer
 */
const initialState = from<StateMap>({
  spinner: false
})

export default createReducer<State>({
  [updateProfile.REQUEST]: (state: State): State => (
    state.merge({
      spinner: true
    })
  ),

  [updateProfile.SUCCESS]: (state: State): State => (
    state.merge({
      spinner: false
    })
  )
}, initialState)