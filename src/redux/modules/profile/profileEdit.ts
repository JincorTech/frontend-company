/* TODO LEGACY */

import { createReducer, createAction, createAsyncAction, createSubmitAction, Action } from '../../../utils/actions';
import { from, ImmutableObject } from 'seamless-immutable';

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>;

export type StateMap = {
  preloader: boolean
  spinner: boolean
  src: string
};

export type FormFields = {
  upload: string
  name: string
  country: string
  city: string
  type: string
  description: string
  activityTypes: string[]
  socialLinks: string[]
  email: string
  phone: string
};

/**
 * Actions
 */
export const UPDATE_PROFILE = 'profile/profileEdit/UPDATE_PROFILE';
export const FETCH_PROFILE  = 'profile/profileEdit/FETCH_PROFILE';
export const UPDATE_CITIES  = 'profile/profileEdit/UPDATE_CITIES';
export const SET_LOGO       = 'profile/profileEdit/SET_LOGO';
export const HIDE_PRELOADER = 'profile/profileEdit/HIDE_PRELOADER';
export const RESET_STATE    = 'profile/profileEdit/RESET_PROFILE_EDIT_STATE';

/**
 * Action creators
 */
export const updateProfile = createSubmitAction<FormFields, void>(UPDATE_PROFILE);
export const fetchProfile  = createAction<void>(FETCH_PROFILE);
export const updateCities  = createAction<string>(UPDATE_CITIES);
export const setLogo       = createAction<string>(SET_LOGO);
export const hidePreloader = createAction<void>(HIDE_PRELOADER);
export const resetState    = createAction<void>(RESET_STATE);

/**
 * Reducer
 */
const initialState = from<StateMap>({
  preloader: true,
  spinner: false,
  src: ''
});

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
  ),

  [SET_LOGO]: (state: State, { payload: src }: Action<string>): State => (
    state.merge({ src })
  ),

  [HIDE_PRELOADER]: (state: State): State => (
    state.merge({ preloader: false })
  ),

  [RESET_STATE]: (state: State): State => (
    state.merge(initialState)
  )
}, initialState);
