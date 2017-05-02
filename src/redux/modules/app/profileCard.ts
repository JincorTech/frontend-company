import { createReducer, createAction, createSubmitAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

/**
 * Types
 */

export type State = StateObj & ImmutableObject<StateObj>

export type StateObj = {
  open: boolean,
  bottomView: BottomView,
  spinner: false,
  editProfileForm: ProfileFields,
  changePasswordForm: PasswordFields
}

export type BottomView = 'buttons' | 'password-form' | 'profile-form'

export type ProfileFields = {
  firstName: string,
  lastName: string,
  position: string,
  avatar: string
}

export type PasswordFields = {
  oldPassword: string,
  password: string
}


/**
 * Constants
 */

export const OPEN_PROFILE_CARD = 'app/profileCard/OPEN_PROFILE_CARD'
export const CLOSE_PROFILE_CARD = 'app/profileCard/CLOSE_PROFILE_CARD'
export const CHANGE_VIEW = 'app/profileCard/CHANGE_VIEW'
export const UPDATE_PROFILE = 'app/profileCard/UPDATE_PROFILE'
export const CHANGE_PASSWORD = 'app/profileCard/CHANGE_PASSWORD'
export const LOGOUT = 'app/profileCard/LOGOUT'


/**
 * Action creators
 */

export const openProfileCard = createAction<void>(OPEN_PROFILE_CARD)
export const closeProfileCard = createAction<void>(CLOSE_PROFILE_CARD)
export const changeView = createAction<BottomView>(CHANGE_VIEW)
export const updateProfile = createSubmitAction<ProfileFields, void>(UPDATE_PROFILE)
export const changePassword = createSubmitAction<PasswordFields, void>(CHANGE_PASSWORD)
export const logout = createAction<void>(LOGOUT)


/**
 * Reducer
 */

const initialState: State = from<StateObj>({
  open: false,
  bottomView: 'buttons',
  spinner: false,
  editProfileForm: {
    firstName: '',
    lastName: '',
    position: '',
    avatar: ''
  },
  changePasswordForm: {
    oldPassword: '',
    password: ''
  }
})

export default createReducer<State>({
  [OPEN_PROFILE_CARD]: (state: State): State => (
    state.merge({ open: true })
  ),

  [CLOSE_PROFILE_CARD]: (state: State): State => (
    state.merge({ open: false, bottomView: 'buttons' })
  ),

  [CHANGE_VIEW]: (state: State, { payload }: Action<BottomView>): State => (
    state.merge({ bottomView: payload })
  ),

  [updateProfile.REQUEST]: (state: State): State => (
    state.merge({ spinner: true })
  ),

  [updateProfile.SUCCESS]: (state: State, { payload }: Action<ProfileFields>): State => (
    state.merge({ spinner: false, editProfileForm: payload })
  ),

  [changePassword.REQUEST]: (state: State): State => (
    state.merge({ spinner: true })
  ),

  [changePassword.SUCCESS]: (state: State, { payload }: Action<PasswordFields>): State => (
    state.merge({ spinner: false, changePasswordForm: payload })
  )
}, initialState)