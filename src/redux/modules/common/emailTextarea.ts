import { createReducer, createAction, Action } from '../../../utils/actions'
import { from, ImmutableObject } from 'seamless-immutable'

/**
 * Types
 */
export type State = StateMap & ImmutableObject<StateMap>

export type StateMap = {
  valid: boolean
  selectedEmail: number
  value: string
  emails: string[]
  inputWidth: number
}

/**
 * Constants
 */
export const CHANGE_VALUE         = 'common/emailTextarea/CHANGE_VALUE'
export const ADD_EMAILS           = 'common/emailTextarea/ADD_EMAILS'
export const REMOVE_LAST_EMAIL    = 'common/emailTextarea/REMOVE_LAST_EMAIL'
export const SET_INPUT_WIDTH      = 'common/emailTextarea/SET_INPUT_WIDTH'
export const VALIDATE_EMAIL       = 'common/emailTextarea/VALIDATE_EMAIL'
export const KEY_PRESS            = 'common/emailTextarea/KEY_PRESS'
export const SELECT_EMAIL         = 'common/emailTextarea/SELECT_EMAIL'
export const UNSELECT_EMAIL       = 'common/emailTextarea/UNSELECT_EMAIL'
export const REMOVE_EMAIL         = 'common/emailTextarea/REMOVE_EMAIL'
export const HANDLE_EMAIL_REMOVE  = 'common/emailTextarea/HANDLE_EMAIL_REMOVE'
export const SET_VALIDATE_STATE   = 'common/emailTextarea/SET_VALIDATE_STATE'
export const RESET_TEXTAREA       = 'common/emailTextarea/RESET_TEXTAREA'

/**
 * Action Creators
 */
export const changeValue        = createAction<string>(CHANGE_VALUE)
export const addEmails          = createAction<string[]>(ADD_EMAILS)
export const removeLastEmail    = createAction<void>(REMOVE_LAST_EMAIL)
export const setInputWidth      = createAction<number>(SET_INPUT_WIDTH)
export const validateEmail      = createAction<string>(VALIDATE_EMAIL)
export const keyPress           = createAction<number>(KEY_PRESS)
export const selectEmail        = createAction<number>(SELECT_EMAIL)
export const unselectEmail      = createAction<void>(UNSELECT_EMAIL)
export const removeEmail        = createAction<number>(REMOVE_EMAIL)
export const handleEmailRemove  = createAction<string>(HANDLE_EMAIL_REMOVE)
export const setValidateState   = createAction<boolean>(SET_VALIDATE_STATE)
export const resetTextarea      = createAction<void>(RESET_TEXTAREA)

/**
 * Reducer
 */
const initialState: State = from<StateMap>({
  valid: false,
  selectedEmail: null,
  value: '',
  emails: [],
  inputWidth: 0
})

export default createReducer<State>({
  [CHANGE_VALUE]: (state: State, { payload }: Action<string>): State => (
    state.merge({ value: payload })
  ),

  [ADD_EMAILS]: (state: State, { payload }: Action<string[]>): State => (
    state.merge({
      emails: [...state.emails, ...payload],
      value: '',
      inputWidth: 15
    })
  ),

  [REMOVE_LAST_EMAIL]: (state: State): State => (
    state.merge({
      emails: state.emails.slice(0, -1)
    })
  ),

  [SET_INPUT_WIDTH]: (state: State, { payload }: Action<number>): State => (
    state.merge({ inputWidth: payload })
  ),

  [SELECT_EMAIL]: (state: State, { payload }: Action<number>): State => (
    state.merge({ selectedEmail: payload })
  ),

  [UNSELECT_EMAIL]: (state: State): State => (
    state.merge({ selectedEmail: null })
  ),

  [REMOVE_EMAIL]: (state: State, { payload: index }: Action<number>): State => (
    state.merge({ emails: [
      ...state.emails.slice(0, index),
      ...state.emails.slice(index + 1)
    ] })
  ),

  [SET_VALIDATE_STATE]: (state: State, { payload }: Action<boolean>): State => (
    state.merge({ valid: payload })
  ),

  [RESET_TEXTAREA]: (state: State): State => (
    state.merge(initialState)
  )
}, initialState)