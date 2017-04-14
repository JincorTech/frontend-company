import { createReducer, createAction, createSubmitAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

/**
 * Types
 */

export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  open: boolean,
  bottomView: number,
  spinner: false,
  editProfileForm: ProfileFields,
  changePasswordForm: PasswordFields
}

export type ProfileFields = {
  firstName: string,
  lastName: string,
  position: string
}

export type PasswordFields = {
  oldPassword: string,
  newPassword: string
}


/**
 * Constants
 */

export const OPEN_PROFILE_CARD = 'common/profileCard/OPEN_PROFILE_CARD'
export const CLOSE_PROFILE_CARD = 'common/profileCard/CLOSE_PROFILE_CARD'
export const CHANGE_VIEW = 'common/profileCard/CHANGE_VIEW'
export const UPDATE_PROFILE = 'common/profileCard/UPDATE_PROFILE'
export const CHANGE_PASSWORD = 'common/profileCard/CHANGE_PASSWORD'


/**
 * Action creators
 */

export const openProfileCard = createAction<void>(OPEN_PROFILE_CARD)
export const closeProfileCard = createAction<void>(CLOSE_PROFILE_CARD)
export const changeView = createAction<number>(CHANGE_VIEW)
export const updateProfile = createSubmitAction<ProfileFields, void>(UPDATE_PROFILE)
export const changePassword = createSubmitAction<PasswordFields, void>(CHANGE_PASSWORD)


/**
 * Reducer
 */

const initialState: State = from<StateMap>({
  open: false,
  bottomView: 0,
  spinner: false,
  editProfileForm: {
    firstName: '',
    lastName: '',
    position: ''
  },
  changePasswordForm: {
    oldPassword: '',
    newPassword: ''
  }
})

export default createReducer<State>({
  [OPEN_PROFILE_CARD]: (state: State): State => (
    state.merge({ open: true })
  ),

  [CLOSE_PROFILE_CARD]: (state: State): State => (
    state.merge({ open: false })
  ),

  [CHANGE_VIEW]: (state: State, { payload }: Action<number>): State => (
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